import { useNavigate } from '@tanstack/react-router';
import { usuarioStore } from '../Store/authstore';
import {
  loginUser,
  registerUser,
  changePassword,
  editUserData,
  obtenerInvitacionPorInvitado,
  editarInvitado
} from '../database/dababase';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

interface Telefono {
  prefijo?: string;
  numero: string;
}

interface Credenciales {
  username: string;
  password: string;
  nombre: string;
  apellido: string;
  correo: string;
  telefono: Telefono;
  fechaNacimiento?: string; // Formato ISO, ej. '1990-05-20'
  provincia: string;
  canton: string;
  aceptoTerminos: boolean;
}

interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface EditUserInput {
  currentPassword: string;
  newNombre: string;
  newApellido: string;
  newProvincia: string;
  newCanton: string;
}

export function Login() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({ username, password }: { username: string; password: string }) => {
      usuarioStore.setState((prev) => ({ ...prev, skeleton: true }));
      const data = await loginUser({ username, password });
      return { ...data, username };
    },

    onSuccess: async (data) => {
      usuarioStore.setState((prev) => ({
        ...prev,
        usuario: data.username,
        autenticado: true,
        nombre: data.nombre,
        apellido: data.apellido,
        provincia: data.provincia,
        canton: data.canton,
      }));

      navigate({ to: "/app/home" });
      await new Promise((r) => setTimeout(r, 5000));

      usuarioStore.setState((prev) => ({ ...prev, skeleton: false }));
    },

    onError: () => {
      cerrarSesion();
    },
  });
}

export function Register() {
  return useMutation({
    mutationFn: async (datos: Credenciales) => {
      const data = await registerUser(datos); // envías todo el objeto
      return { ...data, username: datos.username };
    },
    onSuccess: (data) => {
      usuarioStore.setState((prev) => ({
        ...prev,
        usuario: data.username,
        autenticado: true,
      }));
    },
    onError: () => {
      cerrarSesion();
    },
  });
}


export function cerrarSesion() {
  usuarioStore.setState((prev) => ({
    ...prev,
    usuario: null,
    autenticado: false,
    nombre: null,
    apellido: null,
    canton: null,
    provincia: null,
    skeleton: false,
  }));
  localStorage.removeItem("skeletonShown");
}

export function ChangePassword() {
  return useMutation({
    mutationFn: async ({ currentPassword, newPassword, confirmPassword }: ChangePasswordInput) => {
      if (newPassword !== confirmPassword) {
        throw new Error('La nueva contraseña y la confirmación no coinciden');
      }

      if (!usuarioStore.state.usuario) {
        throw new Error('No hay usuario autenticado');
      }

      return await changePassword({
        username: usuarioStore.state.usuario,
        currentPassword,
        newPassword,
      });
    },
  });
}

export function edituser() {
  return useMutation({
    mutationFn: async ({ currentPassword, newNombre, newApellido, newProvincia, newCanton }: EditUserInput) => {
      if (!usuarioStore.state.usuario) {
        throw new Error('No hay usuario autenticado');
      }

      const data = await editUserData({
        username: usuarioStore.state.usuario,
        currentPassword,
        newNombre,
        newApellido,
        newProvincia,
        newCanton,
      });

      return { ...data, username: usuarioStore.state.usuario };
    },

    onSuccess: (data) => {
      usuarioStore.setState((prev) => ({
        ...prev,
        usuario: data.username,
        autenticado: true,
      }));
    },
  });
}

export function useInvitacion(invitacionId: string) {
  return useQuery({
    queryKey: ['invitacionId'],
    queryFn: () => obtenerInvitacionPorInvitado(invitacionId),
    enabled: Boolean(invitacionId),
    staleTime: 1000 * 60 * 5,
  });
}
export function useEditarInvitado() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editarInvitado,
    onSuccess: () => {
     toast.success("Invitado Editado exitosamente");
      queryClient.invalidateQueries({ queryKey: ['invitados'] });
    },
    onError: (error) => {
      console.error('Error al editar invitado:', error);
      toast.error("Error Editando Invitado");
    },
  });
}
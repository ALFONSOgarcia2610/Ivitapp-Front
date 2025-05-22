import { useNavigate } from '@tanstack/react-router'
import { usuarioStore } from '../Store/authstore'
import { loginUser, registerUser, changePassword, editUserData } from '../database/dababase'
import { useMutation } from '@tanstack/react-query'

interface Credenciales {
  username: string
  password: string
}

interface ChangePasswordInput {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}
interface EditUserInput {
  currentPassword: string
  newNombre: string
  newApellido: string
  newProvincia: string
  newCanton: string
}

export function Login() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({ username, password }: Credenciales) => {
      // ✅ Activamos el skeleton inmediatamente
      usuarioStore.setState((prev) => ({
        ...prev,
        skeleton: true,
      }));

      const data = await loginUser({ username, password });

      // ✅ Retornamos los datos para que onSuccess lo use
      return { ...data, username };
    },

    onSuccess: async (data) => {
      // ✅ Actualizamos el store con la info del usuario, PERO dejamos skeleton activo
      usuarioStore.setState((prev) => ({
        ...prev,
        usuario: data.username,
        autenticado: true,
        nombre: data.nombre,
        apellido: data.apellido,
        provincia: data.provincia,
        canton: data.canton,
        // 👈 NO apagues skeleton aún
      }));

      // ✅ Redirigimos a /home
      navigate({ to: "/home" });

      // ✅ Le damos tiempo a HomePage de montarse y mostrar el Skeleton
      await new Promise((r) => setTimeout(r, 5000)); // Pequeño delay opcional

      // ✅ Luego apagamos el skeleton
      usuarioStore.setState((prev) => ({
        ...prev,
        skeleton: false,
      }));
    },

    onError: () => {
      cerrarSesion(); // También deberías apagar skeleton aquí si lo activaste antes
    },
  });
}


export function Register() {
  return useMutation({
    mutationFn: async ({ username, password }: Credenciales) => {
      const data = await registerUser(username, password)
      return { ...data, username }
    },
    onSuccess: (data) => {
      usuarioStore.setState((prev) => ({
        ...prev,
        usuario: data.username,
        autenticado: true,
      }))
    },
    onError: () => {
      cerrarSesion()
    },
  })
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
    skeleton: false
  }))
  localStorage.removeItem("skeletonShown");
}

export function ChangePassword() {
  return useMutation({
    mutationFn: async ({ currentPassword, newPassword, confirmPassword }: ChangePasswordInput) => {
      if (newPassword !== confirmPassword) {
        throw new Error('La nueva contraseña y la confirmación no coinciden')
      }

      if (!usuarioStore.state.usuario) {
        throw new Error('No hay usuario autenticado')
      }

      const data = await changePassword({
        username: usuarioStore.state.usuario,
        currentPassword,
        newPassword,
      })

      return data
    },
  })
}

export function edituser() {
  return useMutation({
    mutationFn: async ({ currentPassword, newNombre, newApellido, newProvincia, newCanton }: EditUserInput) => {
      if (!usuarioStore.state.usuario) {
        throw new Error('No hay usuario autenticado')
      }

      const data = await editUserData({
        username: usuarioStore.state.usuario,
        currentPassword,
        newNombre,
        newApellido,
        newProvincia,
        newCanton,
      })

      return { ...data, username: usuarioStore.state.usuario }
    },
    onSuccess: (data) => {
      usuarioStore.setState((prev) => ({
        ...prev,
        usuario: data.username,
        autenticado: true,
      }))
    },
    onError: () => {

    },
  })
}
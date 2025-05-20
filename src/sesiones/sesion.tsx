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
  return useMutation({
    mutationFn: async ({ username, password }: Credenciales) => {
      const data = await loginUser({ username, password, })
      return { ...data, username }
    },
    onSuccess: (data) => {
      usuarioStore.setState((prev) => ({
        ...prev,
        usuario: data.username,
        autenticado: true,
        nombre: data.nombre,
        apellido: data.apellido,
        provincia: data.provincia,
        canton: data.canton
      }))
    },
    onError: () => {
      cerrarSesion()
    },
  })
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
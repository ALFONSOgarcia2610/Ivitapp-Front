import { usuarioStore } from '../Store/authstore'
import { loginUser, registerUser, changePassword } from '../database/dababase'
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

export function Login() {
  return useMutation({
    mutationFn: async ({ username, password }: Credenciales) => {
      const data = await loginUser({ username, password })
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
  }))
}

/** Nueva función para cambiar contraseña */
export function ChangePassword() {
  return useMutation({
    mutationFn: async ({ currentPassword, newPassword, confirmPassword }: ChangePasswordInput) => {
      if (newPassword !== confirmPassword) {
        throw new Error('La nueva contraseña y la confirmación no coinciden')
      }

      if (!usuarioStore.state.usuario ) {
        throw new Error('No hay usuario autenticado')
      }

      const data = await changePassword({
        username:  usuarioStore.state.usuario,
        currentPassword,
        newPassword,
      })

      return data
    },
  })
}

import { usuarioStore } from '../Store/authstore'
import { loginUser } from '../database/dababase'
import { registerUser } from '../database/dababase'
import { useMutation } from '@tanstack/react-query'


interface Credenciales {
  username: string
  password: string
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

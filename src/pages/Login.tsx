import * as React from 'react'
import { Login } from '../sesiones/sesion' 
import { useStore } from '@tanstack/react-store'
import { usuarioStore } from '../Store/authstore'
import { useRouter } from '@tanstack/react-router'

export default function LoginComponent() {
  const loginMutation = Login()
  const router = useRouter()
  const auth = useStore(usuarioStore, (s) => s)

  const onFormSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    const formData = new FormData(evt.currentTarget)
    const username = formData.get('username')?.toString() || ''
    const password = formData.get('password')?.toString() || ''

    if (!username || !password) return

    await loginMutation.mutateAsync({ username, password })

    console.log('🟢 Estado del store después del login:', usuarioStore.state)

    if (usuarioStore.state.autenticado) {
      router.history.push('/') 
    }
  }

  return (
    <div className="p-2 grid gap-4 place-items-center">
      <h3 className="text-xl font-semibold">Login</h3>

      <form onSubmit={onFormSubmit} className="grid gap-3 min-w-[300px]">
        <div className="grid gap-1">
          <label htmlFor="username">Username</label>
          <input
            name="username"
            id="username"
            required
            className="border p-2 rounded"
            placeholder="Your username"
          />
        </div>

        <div className="grid gap-1">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            id="password"
            type="password"
            required
            className="border p-2 rounded"
            placeholder="Your password"
          />
        </div>

        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="bg-blue-500 text-white py-2 px-4 rounded disabled:bg-gray-400"
        >
          {loginMutation.isPending ? 'Logging in...' : 'Login'}
        </button>

        {loginMutation.isError && (
          <p className="text-red-500">
            Error: {(loginMutation.error as Error).message}
          </p>
        )}
      </form>

      <div className="mt-4">
        <p className="text-sm">Estado global:</p>
        <pre className="text-xs bg-gray-100 p-2 rounded">
          {JSON.stringify(auth, null, 2)}
        </pre>
      </div>
    </div>
  )
}

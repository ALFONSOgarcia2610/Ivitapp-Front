import * as React from 'react'
import { Login } from '../sesiones/sesion'
import { usuarioStore } from '../Store/authstore'
import { useRouter } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
export default function LoginComponent() {
  const loginMutation = Login()
  const router = useRouter()


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
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>INICIO DE SESION</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onFormSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">USUARIO</Label>
                <Input
                  name="username"
                  id="username"
                  required
                  className="border p-2 rounded"
                  placeholder="Su Username"
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">CONTRASEÑA</Label>
                <Input
                  name="password"
                  id="password"
                  type="password"
                  required
                  className="border p-2 rounded"
                  placeholder="Su Contraseña"
                />
              </div>
              <CardFooter className="flex justify-between">
                <Button
                  type="submit"
                  disabled={loginMutation.isPending}
                  className="bg-blue-500 text-white py-2 px-4 rounded disabled:bg-gray-400"
                >
                  {loginMutation.isPending ? 'Cargando...' : 'Iniciar'}
                </Button>
                <Link to="/register">
                  <Button
                    type="button"
                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                  >
                    Registrar
                  </Button>

                </Link>
              </CardFooter>
              {loginMutation.isError && (
                <p className="text-red-500">
                  Error: {(loginMutation.error as Error).message}
                </p>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

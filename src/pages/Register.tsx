import * as React from 'react'
import { Register } from '../sesiones/sesion'
import { usuarioStore } from '../Store/authstore'
import { useRouter } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
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

export default function RegisterComponent() {
    const registerMutation = Register()
    const router = useRouter()

    const onFormSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault()
        const formData = new FormData(evt.currentTarget)
        const username = formData.get('username')?.toString() || ''
        const password = formData.get('password')?.toString() || ''

        if (!username || !password) return

        await registerMutation.mutateAsync({ username, password })

        if (usuarioStore.state.autenticado) {
            router.history.push('/')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>REGISTRO</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={onFormSubmit} className="grid w-full gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="username">USUARIO</Label>
                            <Input
                                name="username"
                                id="username"
                                required
                                className="border p-2 rounded"
                                placeholder="Elija un nombre de usuario"
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
                                placeholder="Elija una contraseña"
                            />
                        </div>

                        <CardFooter className="flex flex-col items-center">
                            <Button
                                type="submit"
                                disabled={registerMutation.isPending}
                                className="w-full"
                                variant={"inicio"}
                            >
                                {registerMutation.isPending ? 'Cargando...' : 'Registrar'}
                            </Button>

                            <p className="mt-4 text-sm text-center">
                                ¿Ya tienes una cuenta?{' '}
                                <Link
                                    to="/login"
                                    className="font-medium text-blue-600 hover:underline"
                                >
                                    Inicia sesión aquí
                                </Link>
                            </p>
                        </CardFooter>

                        {registerMutation.isError && (
                            <p className="text-red-500 text-center">
                                Error: {(registerMutation.error as Error).message}
                            </p>
                        )}
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

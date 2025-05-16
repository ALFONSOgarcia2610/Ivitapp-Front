import * as React from 'react'
import { edituser } from '../sesiones/sesion'
import { usuarioStore } from '../Store/authstore'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useRouter } from '@tanstack/react-router'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

export default function EditarPerfilComponent() {
    const router = useRouter()
    const editarUsuario = edituser()
    const [localError, setLocalError] = React.useState<string | null>(null)
    const [successMessage, setSuccessMessage] = React.useState<string | null>(null)

    const onFormSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault()
        setLocalError(null)
        setSuccessMessage(null)

        const formData = new FormData(evt.currentTarget)
        const currentPassword = formData.get('currentPassword')?.toString() || ''
        const newNombre = formData.get('newNombre')?.toString() || ''
        const newApellido = formData.get('newApellido')?.toString() || ''
        const newProvincia = formData.get('newProvincia')?.toString() || ''
        const newCanton = formData.get('newCanton')?.toString() || ''

        if (!currentPassword || !newNombre || !newApellido || !newProvincia || !newCanton) {
            setLocalError('Todos los campos son obligatorios.')
            return
        }

        try {
            await editarUsuario.mutateAsync({
                currentPassword,
                newNombre,
                newApellido,
                newProvincia,
                newCanton,
            })

            // ✅ Actualiza el store local solo después del éxito
            usuarioStore.setState((prev) => ({
                ...prev,
                nombre: newNombre,
                apellido: newApellido,
                provincia: newProvincia,
                canton: newCanton,
            }))

            setSuccessMessage('Datos actualizados correctamente.')
            router.history.push('/')
        } catch (error) {
            setLocalError((error as Error).message)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>EDITAR PERFIL</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={onFormSubmit}>
                        <div className="grid w-full items-center gap-4">

                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="newNombre">NOMBRE</Label>
                                <Input
                                    name="newNombre"
                                    id="newNombre"
                                    type="text"
                                    required
                                    defaultValue={usuarioStore.state.nombre || "nombre"}
                                />
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="newApellido">APELLIDO</Label>
                                <Input
                                    name="newApellido"
                                    id="newApellido"
                                    type="text"
                                    required
                                    defaultValue={usuarioStore.state.apellido || "apellido"}

                                />
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="newProvincia">PROVINCIA</Label>
                                <Input
                                    name="newProvincia"
                                    id="newProvincia"
                                    type="text"
                                    required
                                    defaultValue={usuarioStore.state.provincia || "provincia"}
                                />
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="newCanton">CANTÓN</Label>
                                <Input
                                    name="newCanton"
                                    id="newCanton"
                                    type="text"
                                    required
                                    defaultValue={usuarioStore.state.canton || "canton"}

                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="currentPassword">CONFIRMAR CONTRASEÑA</Label>
                                <Input
                                    name="currentPassword"
                                    id="currentPassword"
                                    type="password"
                                    required
                                    placeholder="Ingrese su contraseña"
                                />
                            </div>


                            <CardFooter className="flex justify-center">

                                <Button type="submit" disabled={editarUsuario.isPending}>
                                    {editarUsuario.isPending ? 'Actualizando...' : 'Guardar Cambios'}
                                </Button>
                            </CardFooter>

                            {(localError || editarUsuario.isError) && (
                                <p className="text-red-500">
                                    Error: {localError ?? (editarUsuario.error as Error)?.message}
                                </p>
                            )}

                            {successMessage && (
                                <p className="text-green-600">
                                    {successMessage}
                                </p>
                            )}
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

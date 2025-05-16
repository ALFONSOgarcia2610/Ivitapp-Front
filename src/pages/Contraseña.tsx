import * as React from 'react'
import { ChangePassword } from '../sesiones/sesion'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useNavigate } from '@tanstack/react-router'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function ChangePasswordComponent() {
  const navigate = useNavigate()
  const changePasswordMutation = ChangePassword()
  const [localError, setLocalError] = React.useState<string | null>(null)
  const [successMessage, setSuccessMessage] = React.useState<string | null>(null)

  const onFormSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    setLocalError(null)
    setSuccessMessage(null)

    const formData = new FormData(evt.currentTarget)
    const currentPassword = formData.get('currentPassword')?.toString() || ''
    const newPassword = formData.get('newPassword')?.toString() || ''
    const confirmPassword = formData.get('confirmPassword')?.toString() || ''

    if (!currentPassword || !newPassword || !confirmPassword) {
      setLocalError('Todos los campos son obligatorios.')
      return
    }

    if (newPassword !== confirmPassword) {
      setLocalError('La nueva contraseña y la confirmación no coinciden.')
      return
    }

    try {
      await changePasswordMutation.mutateAsync({ currentPassword, newPassword, confirmPassword })
      setSuccessMessage('Contraseña cambiada con éxito.')
      navigate({ to: "/home" })
    } catch (error) {
      setLocalError((error as Error).message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>CAMBIAR CONTRASEÑA</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onFormSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="currentPassword">CONTRASEÑA ACTUAL</Label>
                <Input
                  name="currentPassword"
                  id="currentPassword"
                  type="password"
                  required
                  className="border p-2 rounded"
                  placeholder="Ingrese su contraseña actual"
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="newPassword">NUEVA CONTRASEÑA</Label>
                <Input
                  name="newPassword"
                  id="newPassword"
                  type="password"
                  required
                  className="border p-2 rounded"
                  placeholder="Ingrese la nueva contraseña"
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="confirmPassword">CONFIRMAR NUEVA CONTRASEÑA</Label>
                <Input
                  name="confirmPassword"
                  id="confirmPassword"
                  type="password"
                  required
                  className="border p-2 rounded"
                  placeholder="Confirme la nueva contraseña"
                />
              </div>

              <CardFooter className="flex justify-center">
                <Button
                  type="submit"
                  disabled={changePasswordMutation.isPending}
                >
                  {changePasswordMutation.isPending ? 'Cambiando...' : 'Cambiar Contraseña'}
                </Button>
              </CardFooter>

              {(localError || changePasswordMutation.isError) && (
                <p className="text-red-500">
                  Error: {localError ?? (changePasswordMutation.error as Error)?.message}
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

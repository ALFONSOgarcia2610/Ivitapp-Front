import { Login } from "../../sesiones/sesion";
import { Link } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import Footer from "@/comunes/footer";

export default function LoginComponent() {
  const loginMutation = Login();

  const [username, setUsername] = useState("");
  const [capsLockOn, setCapsLockOn] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  useEffect(() => {
    const handleKeyEvent = (e: KeyboardEvent) => {
      const caps = e.getModifierState && e.getModifierState("CapsLock");
      setCapsLockOn(caps);
    };

    window.addEventListener("keydown", handleKeyEvent);
    window.addEventListener("keyup", handleKeyEvent);

    return () => {
      window.removeEventListener("keydown", handleKeyEvent);
      window.removeEventListener("keyup", handleKeyEvent);
    };
  }, []);

  const onFormSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const formData = new FormData(evt.currentTarget);
    const username = formData.get("username")?.toString() || "";
    const password = formData.get("password")?.toString() || "";

    if (!username || !password) return;

    loginMutation.mutate({ username, password });
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.toLowerCase();
    const soloLetras = input.replace(/[^a-z]/g, "");
    setUsername(soloLetras);
  };

  const handlePasswordKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const caps = e.getModifierState("CapsLock");
    setCapsLockOn(caps);
  };


  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow flex items-center justify-center">
        {capsLockOn && passwordFocused && (
          <div className="fixed top-[120px] left-1/2 -translate-x-1/2 px-5 py-3 bg-yellow-50 border border-yellow-300 text-yellow-900 font-semibold rounded-lg shadow-md z-50 select-none">
            ⚠️ Bloq Mayús está activado
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle>INICIO DE SESIÓN</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={onFormSubmit} className="grid w-full gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">USUARIO</Label>
                <Input
                  name="username"
                  id="username"
                  required
                  placeholder="Su Username"
                  value={username}
                  onChange={handleUsernameChange}
                  autoComplete="username"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">CONTRASEÑA</Label>
                <Input
                  name="password"
                  id="password"
                  type="password"
                  required
                  placeholder="Su Contraseña"
                  onKeyDown={handlePasswordKeyDown}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  autoComplete="current-password"
                />
              </div>
              <CardFooter className="flex flex-col items-center">
                <Button
                  type="submit"
                  disabled={loginMutation.isPending}
                  className="w-full"
                >
                  {loginMutation.isPending ? "Cargando..." : "Iniciar"}
                </Button>
                <p className="mt-4 text-sm text-center">
                  ¿Olvidaste tu contraseña?{" "}
                  <Link
                    to="/"
                    className="font-medium text-blue-600 hover:underline"
                  >
                    Recuperala
                  </Link>
                </p>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );

}

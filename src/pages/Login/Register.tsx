"use client";

import * as React from "react";
import { useRouter } from "@tanstack/react-router";
import { toast } from "sonner";
import { Register } from "../../sesiones/sesion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import Footer from "@/comunes/footer";

export default function RegisterComponent() {
  const registerMutation = Register();
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState<"cuenta" | "datos">("cuenta");

  const [formData, setFormData] = React.useState({
    username: "",
    password: "",
    correo: "",
    telefono: "",
    nombre: "",
    apellido: "",
    fechaNacimiento: "",
    provincia: "",
    canton: "",
  });

  const [aceptoTerminos, setAceptoTerminos] = React.useState(false);

  React.useEffect(() => {
    if (registerMutation.isSuccess) {
      toast.success("Usuario registrado exitosamente");
      router.history.push("/app/home");
    }
  }, [registerMutation.isSuccess, router.history]);

  React.useEffect(() => {
    if (registerMutation.isError) {
      toast.error((registerMutation.error as Error).message);
    }
  }, [registerMutation.isError, registerMutation.error]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateTab = (tab: "cuenta" | "datos") => {
    if (tab === "cuenta") {
      if (!formData.username.trim()) {
        toast.error("El usuario es obligatorio");
        return false;
      }
      if (!formData.password) {
        toast.error("La contraseña es obligatoria");
        return false;
      }
      if (!formData.correo.trim()) {
        toast.error("El correo es obligatorio");
        return false;
      }
      if (!formData.telefono.trim()) {
        toast.error("El teléfono es obligatorio");
        return false;
      }
    }
    return true;
  };

  const onNext = () => {
    if (validateTab("cuenta")) {
      setActiveTab("datos");
    }
  };

  const onBack = () => {
    setActiveTab("cuenta");
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!aceptoTerminos) {
      toast.error("Debes aceptar los términos y condiciones");
      return;
    }

    try {
      await registerMutation.mutateAsync({
        ...formData,
        telefono: {
          prefijo: "+593",
          numero: formData.telefono.trim(),
        },
        aceptoTerminos,
      });
    } catch {
      // Error ya mostrado
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 mt-20 lg:mt-0">
      <div className="flex-grow flex items-center justify-center px-4 py-10 sm:py-16">
        <Card className="w-full max-w-3xl shadow-lg rounded-lg">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-semibold text-gray-800 tracking-tight">
              Registro de Usuario
            </CardTitle>

            {/* Tabs solo visuales, no clickeables */}
            <div className="flex justify-center mt-4 space-x-6 border-b border-gray-200">
              <div
                className={`pb-2 font-medium cursor-default ${
                  activeTab === "cuenta"
                    ? "border-b-2 border-indigo-600 text-indigo-600"
                    : "text-gray-400"
                }`}
              >
                Cuenta
              </div>
              <div
                className={`pb-2 font-medium cursor-default ${
                  activeTab === "datos"
                    ? "border-b-2 border-indigo-600 text-indigo-600"
                    : "text-gray-400"
                }`}
              >
                Datos Personales
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={onSubmit} className="grid gap-6">
              {activeTab === "cuenta" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="username">Usuario *</Label>
                    <Input
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={onChange}
                      required
                      placeholder="Elige un nombre de usuario"
                    />
                  </div>

                  <div>
                    <Label htmlFor="password">Contraseña *</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={onChange}
                      required
                      placeholder="Elige una contraseña"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="correo">Correo electrónico *</Label>
                    <Input
                      id="correo"
                      name="correo"
                      type="email"
                      value={formData.correo}
                      onChange={onChange}
                      required
                      placeholder="tucorreo@ejemplo.com"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="telefono">Teléfono *</Label>
                    <Input
                      id="telefono"
                      name="telefono"
                      value={formData.telefono}
                      onChange={onChange}
                      required
                      placeholder="0999999999"
                    />
                  </div>

                  <div className="md:col-span-2 flex justify-end">
                    <Button type="button" onClick={onNext}>
                      Siguiente
                    </Button>
                  </div>
                </div>
              )}

              {activeTab === "datos" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nombre">Nombre</Label>
                    <Input
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={onChange}
                      placeholder="Tu nombre"
                    />
                  </div>

                  <div>
                    <Label htmlFor="apellido">Apellido</Label>
                    <Input
                      id="apellido"
                      name="apellido"
                      value={formData.apellido}
                      onChange={onChange}
                      placeholder="Tu apellido"
                    />
                  </div>

                  <div>
                    <Label htmlFor="fechaNacimiento">Fecha de Nacimiento</Label>
                    <Input
                      id="fechaNacimiento"
                      name="fechaNacimiento"
                      type="date"
                      value={formData.fechaNacimiento}
                      onChange={onChange}
                    />
                  </div>

                  <div>
                    <Label htmlFor="provincia">Provincia</Label>
                    <Input
                      id="provincia"
                      name="provincia"
                      value={formData.provincia}
                      onChange={onChange}
                      placeholder="Ej: Pichincha"
                    />
                  </div>

                  <div>
                    <Label htmlFor="canton">Cantón</Label>
                    <Input
                      id="canton"
                      name="canton"
                      value={formData.canton}
                      onChange={onChange}
                      placeholder="Ej: Quito"
                    />
                  </div>

                  <div className="flex items-center space-x-2 md:col-span-2">
                    <Checkbox
                    className="border border-black"
                      id="terminos"
                      checked={aceptoTerminos}
                      onCheckedChange={(v) => setAceptoTerminos(Boolean(v))}
                    />
                    <Label htmlFor="terminos" className="select-none">
                      Acepto los{" "}
                      <a
                        href="/terminos"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:underline"
                      >
                        términos y condiciones
                      </a>
                    </Label>
                  </div>

                  <div className="md:col-span-2 flex justify-between">
                    <Button type="button" variant="outline" onClick={onBack}>
                      Atrás
                    </Button>
                    <Button type="submit" disabled={registerMutation.isPending}>
                      {registerMutation.isPending ? "Registrando..." : "Registrarse"}
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}

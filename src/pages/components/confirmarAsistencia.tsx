"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { editarInvitado } from "@/database/dababase";


interface ConfirmarAsistenciaProps {
  invitadoId: string;
}

export default function ConfirmarAsistencia({ invitadoId }: ConfirmarAsistenciaProps) {
  const [estado, setEstado] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleClick = async (valor: string) => {
    setLoading(true);
    try {
      await editarInvitado({
        idInvitado: invitadoId,
        estado: valor, // "Asistira" o "No asistira"
      });

      setEstado(valor);
      toast(
        valor === "Si Asistira" ? "¡Gracias por confirmar!" : "Lamentamos que no puedas asistir",
        {
          description:
            valor === "Si Asistira"
              ? "Nos alegra que nos acompañes en este día tan especial."
              : "Esperamos verte en otra ocasión.",
        }
      );
    } catch (error) {
      console.error(error);
      toast.error("Error al confirmar asistencia, intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-4 text-center">
      <div className="flex justify-center gap-6">
        <Button
          variant={estado === "Asistira" ? "default" : "outline"}
          onClick={() => handleClick("Si Asistira")}
          disabled={loading}
          className="relative cursor-pointer z-10 bg-white text-green-800 font-serif text-sm sm:text-lg px-4 sm:px-10 py-2 sm:py-4 rounded-md border border-green-500 shadow-md transition-all duration-300 ease-in-out tracking-wide overflow-hidden"
        >
          Asistiré
        </Button>

        <Button
          variant={estado === "No asistira" ? "default" : "outline"}
          onClick={() => handleClick("No asistira")}
          disabled={loading}
          className="relative cursor-pointer z-10 bg-white text-green-800 font-serif text-sm sm:text-lg px-4 sm:px-10 py-2 sm:py-4 rounded-md border border-green-500 shadow-md transition-all duration-300 ease-in-out tracking-wide overflow-hidden"
        >
          No asistiré
        </Button>
      </div>
    </div>
  );
}

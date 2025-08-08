"use client";

import React, { useRef, useState } from "react";
import * as XLSX from "xlsx";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { guardarInvitado } from "@/database/dababase";
import { FileUp, Loader2 } from "lucide-react";

interface InvitadoExcel {
  Nombre: string;
  Apellido: string;
  Mesa?: number | string;
  Admisión?: number | string;
  Prefijo: string;
  Teléfono: string;
}

interface Props {
  username: string;
  onSuccess?: () => void;
}

export function ImportExcelInvitados({ username, onSuccess }: Props) {
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (evt) => {
      const data = evt.target?.result;
      if (!data) return;

      const workbook = XLSX.read(data, { type: "binary" });
      const firstSheet = workbook.SheetNames[0];
      const worksheet = XLSX.utils.sheet_to_json<InvitadoExcel>(workbook.Sheets[firstSheet]);

      setLoading(true);

      try {
        for (const invitado of worksheet) {
          if (!invitado.Nombre || !invitado.Apellido || !invitado.Teléfono || !invitado.Prefijo) {
            toast.error(`Faltan datos en: ${JSON.stringify(invitado)}`);
            continue;
          }

          await guardarInvitado({
            username,
            nombre: invitado.Nombre.trim(),
            apellido: invitado.Apellido.trim(),
            mesa: invitado.Mesa ? Number(invitado.Mesa) : undefined,
            admision: invitado["Admisión"] ? Number(invitado["Admisión"]) : undefined,
            telefono: {
              prefijo: invitado.Prefijo.trim(),
              numero: invitado.Teléfono.trim(),
            },
          });
        }

        toast.success("Invitados importados exitosamente");
        onSuccess?.();
      } catch (error) {
        console.error(error);
        toast.error("Error importando invitados. Revisa consola.");
      } finally {
        setLoading(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = ""; // reset input
        }
      }
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div className="space-y-3">
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
        disabled={loading}
        ref={fileInputRef}
        className="hidden"
      />
      <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
      <button
        type="button"
         className="p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition"
        onClick={() => fileInputRef.current?.click()}
        disabled={loading}
      >
        <FileUp className="w-6 h-6 text-sky-600" strokeWidth={2.5}  />
        {loading && <Loader2 className="ml-2 w-4 h-4 animate-spin" />}
      </button>
      </TooltipTrigger>
        <TooltipContent side="bottom">
          <span>Subir Excel</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
    </div>
  );
}

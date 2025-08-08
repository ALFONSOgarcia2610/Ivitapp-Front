// ExportExcelButton.tsx
"use client";


import { utils, writeFile } from "xlsx";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { FileDown } from "lucide-react";

interface Telefono {
  prefijo?: string;
  numero: string;
}

interface Invitado {
  _id: string;
  nombre: string;
  apellido: string;
  mesa?: number;
  admision?: number;
  telefono: Telefono;
  createdAt: string;
  updatedAt: string;
}

interface ExportExcelButtonProps {
  invitados: Invitado[];
}

export function ExportExcelButton({ invitados }: ExportExcelButtonProps) {
  const exportToExcel = () => {
    if (invitados.length === 0) {
      toast.error("No hay invitados para exportar");
      return;
    }

    const dataToExport = invitados.map((inv) => ({
      Nombre: inv.nombre,
      Apellido: inv.apellido,
      Mesa: inv.mesa ?? "",
      Admisión: inv.admision ?? "",
      Prefijo: inv.telefono.prefijo ?? "",
      Teléfono: inv.telefono.numero,
      "Fecha Creación": new Date(inv.createdAt).toLocaleDateString(),
      "Última Actualización": new Date(inv.updatedAt).toLocaleDateString(),
    }));

    const worksheet = utils.json_to_sheet(dataToExport);

    const headerRange = utils.decode_range(worksheet['!ref']!);
    for (let C = headerRange.s.c; C <= headerRange.e.c; ++C) {
      const cellAddress = utils.encode_cell({ c: C, r: 0 });
      if (!worksheet[cellAddress]) continue;
      worksheet[cellAddress].s = {
        fill: { fgColor: { rgb: "4472C4" } }, // azul oscuro
        font: { color: { rgb: "FFFFFF" }, bold: true, sz: 12 },
        alignment: { horizontal: "center", vertical: "center" },
        border: {
          top: { style: "thin", color: { rgb: "000000" } },
          bottom: { style: "thin", color: { rgb: "000000" } },
          left: { style: "thin", color: { rgb: "000000" } },
          right: { style: "thin", color: { rgb: "000000" } },
        },
      };
    }

    for (let R = headerRange.s.r + 1; R <= headerRange.e.r; ++R) {
      for (let C = headerRange.s.c; C <= headerRange.e.c; ++C) {
        const cellAddress = utils.encode_cell({ c: C, r: R });
        if (!worksheet[cellAddress]) continue;
        worksheet[cellAddress].s = {
          fill: { fgColor: { rgb: "D9E1F2" } }, // azul claro
          font: { color: { rgb: "000000" }, sz: 11 },
          alignment: { horizontal: "left", vertical: "center" },
          border: {
            top: { style: "thin", color: { rgb: "000000" } },
            bottom: { style: "thin", color: { rgb: "000000" } },
            left: { style: "thin", color: { rgb: "000000" } },
            right: { style: "thin", color: { rgb: "000000" } },
          },
        };
      }
    }

    worksheet['!cols'] = [
      { wch: 15 },
      { wch: 15 },
      { wch: 8 },
      { wch: 10 },
      { wch: 8 },
      { wch: 15 },
      { wch: 18 },
      { wch: 20 },
    ];

    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Invitados");

    try {
      writeFile(workbook, "invitados.xlsx");
      toast.success("Archivo Excel generado correctamente");
    } catch (error) {
      toast.error("Error generando archivo Excel");
      console.error(error);
    }
  };

  return (
    
     <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
      <button
         className="p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition"
       onClick={exportToExcel}
      >
        <FileDown className="w-6 h-6 text-sky-600" strokeWidth={2.5}  />
      </button>
      </TooltipTrigger>
        <TooltipContent side="bottom">
          <span> Exportar Excel</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

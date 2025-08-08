"use client";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import jsPDF from "jspdf";
import { ScanQrCode } from "lucide-react";
import QRCode from "qrcode";
import logo from "@/img/logo.png";

// IMPORTANTE: reemplaza esta URL por una imagen base64 o una URL pública accesible
// usa base64 si no es público

interface Invitado {
  _id: string;
  nombre: string;
  apellido: string;
}

interface DescargarQRsPDFProps {
  invitados: Invitado[];
}

export function DescargarQRsPDF({ invitados }: DescargarQRsPDFProps) {
  const descargarTodosQRs = async () => {
    if (invitados.length === 0) return;

    const doc = new jsPDF({
      unit: "pt",
      format: "a4",
    });

    const padding = 20;
    const qrSize = 120;
    const itemsPerRow = 3;
    const itemsPerPage = 9;
    let x = padding;
    let y = padding;

    // Cargar logo en base64
    const toBase64 = (url: string): Promise<string> =>
      fetch(url)
        .then((res) => res.blob())
        .then(
          (blob) =>
            new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result as string);
              reader.onerror = reject;
              reader.readAsDataURL(blob);
            })
        );

    const logoBase64 = await toBase64(logo);

    // --- CABECERA SOLO EN PRIMERA PÁGINA ---
    const pageWidth = doc.internal.pageSize.getWidth();
    const centerX = pageWidth / 2;

    // Logo
    doc.addImage(logoBase64, "PNG", centerX - 40, y, 80, 80);
    y += 90;

    // Título
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Códigos QR para Invitados", centerX, y, { align: "center" });
    y += 24;

    // Descripción
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Escanea el código QR para ver la invitación personalizada", centerX, y, { align: "center" });
    y += 30;

    let itemCount = 0;

    for (let i = 0; i < invitados.length; i++) {
      const inv = invitados[i];
      const url = `http://localhost:5173/invitacion/${inv._id}`;
      const dataUrl = await QRCode.toDataURL(url, { width: qrSize, margin: 1 });

      doc.addImage(dataUrl, "PNG", x, y, qrSize, qrSize);

      const nombreCompleto = `${inv.nombre} ${inv.apellido}`;
      doc.setFontSize(10);
      doc.text(nombreCompleto, x + qrSize / 2, y + qrSize + 15, {
        align: "center",
      });

      itemCount++;
      if (itemCount % itemsPerRow === 0) {
        x = padding;
        y += qrSize + 40;
      } else {
        x += qrSize + padding;
      }

      if (itemCount % itemsPerPage === 0 && i !== invitados.length - 1) {
        doc.addPage();
        x = padding;
        y = padding;
      }
    }

    doc.save("todos-los-qrs.pdf");
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={descargarTodosQRs}
            className="p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition"
          >
            <ScanQrCode className="w-6 h-6 text-sky-600" strokeWidth={2.5} />
          </button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <span>Descargar todos los QR</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

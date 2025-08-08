"use client";

import type { ColumnDef } from "@tanstack/react-table";
import {
  Eye,
  Edit,
  Trash2,
  QrCode,
  MoreHorizontal,
  Send,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRef, useState } from "react";
import { ModalQR } from "@/comunes/ModalQR";
import { EditarInvitadoDialog } from "@/comunes/editarInvitadoModal";

export interface Invitado {
  _id: string;
  nombre: string;
  apellido: string;
  mesa?: number;
  admision?: number;
  telefono: {
    prefijo: string;
    numero: string;
  };
  detalle?: string;
  estado?: string;
}

export const columns: ColumnDef<Invitado>[] = [
  {
    id: "acciones",
    header: () => <div className="text-center">Acciones</div>,
    cell: function AccionesCell({ row }) {
      const invitado = row.original;
      const [showQR, setShowQR] = useState<string | null>(null);
      const [dropdownOpen, setDropdownOpen] = useState(false);
      const [editOpen, setEditOpen] = useState(false);
      const triggerRef = useRef<HTMLButtonElement>(null);

      // Cierra modales y dropdown y luego enfoca el botón trigger
      const handleCloseModal = () => {
        setShowQR(null);
        setEditOpen(false);
        setDropdownOpen(false);
        setTimeout(() => {
          triggerRef.current?.focus();
        }, 100);
      };

      // Abrir modal QR, cerrando antes dropdown
      const openModalQR = () => {
        setDropdownOpen(false);
        setShowQR(invitado._id);
      };

      // Abrir modal editar, cerrando antes dropdown
      const openEditarModal = () => {
        setDropdownOpen(false);
        setEditOpen(true);
      };

      return (
        <div className="text-center">
          {/* Renderizar modales fuera del dropdown */}
          {showQR === invitado._id && (
            <ModalQR open={true} onClose={handleCloseModal} idInvitado={invitado._id} />
          )}

          <EditarInvitadoDialog
            invitado={editOpen ? invitado : null}
            open={editOpen}
            onOpenChange={(open) => {
              setEditOpen(open);
              if (!open) {
                handleCloseModal();
              }
            }}
            onClose={handleCloseModal}
          />

          <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" ref={triggerRef}>
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() =>
                  window.open(
                    `https://wa.me/${invitado.telefono.prefijo}${invitado.telefono.numero}`,
                    "_blank"
                  )
                }
              >
                <Send className="mr-2 h-4 w-4" /> WhatsApp
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => window.open(`/invitacion/${invitado._id}`, "_blank")}
              >
                <Eye className="mr-2 h-4 w-4" /> Ver invitación
              </DropdownMenuItem>
              <DropdownMenuItem onClick={openModalQR}>
                <QrCode className="mr-2 h-4 w-4" /> Generar QR
              </DropdownMenuItem>
              <DropdownMenuItem onClick={openEditarModal}>
                <Edit className="mr-2 h-4 w-4" /> Editar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => console.log("Eliminar", invitado)}>
                <Trash2 className="mr-2 h-4 w-4 text-red-600" /> Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
{
  accessorKey: "estado",
  header: () => <div className="text-center">Estado</div>,
  cell: ({ getValue }) => {
    const valor = String(getValue()).toLowerCase();

    const getColorClass = () => {
      if (valor === "si asistira") return "bg-green-100 text-green-800";
      if (valor === "no asistira") return "bg-red-200 text-red-800";
      return "bg-yellow-100 text-yellow-800";
    };

    return (
      <div className="text-center">
        <Badge className={`rounded-full text-xs font-medium ${getColorClass()}`}>
          {valor.charAt(0).toUpperCase() + valor.slice(1)}
        </Badge>
      </div>
    );
  },
},
  {
    accessorKey: "nombre",
    header: () => <div className="text-center">Nombre</div>,
    cell: (info) => (
      <div className="text-center whitespace-nowrap">{String(info.getValue())}</div>
    ),
  },
  {
    accessorKey: "apellido",
    header: () => <div className="text-center">Apellido</div>,
    cell: (info) => (
      <div className="text-center whitespace-nowrap">{String(info.getValue())}</div>
    ),
  },
  {
    accessorKey: "mesa",
    header: () => <div className="text-center">Mesa</div>,
    cell: ({ getValue }) => (
      <div className="text-center whitespace-nowrap">
        {getValue() !== undefined && getValue() !== null ? String(getValue()) : "-"}
      </div>
    ),
  },
  {
    accessorKey: "admision",
    header: () => <div className="text-center">Admisión</div>,
    cell: ({ getValue }) => (
      <div className="text-center whitespace-nowrap">
        {getValue() !== undefined && getValue() !== null ? String(getValue()) : "-"}
      </div>
    ),
  },
  {
    accessorKey: "telefono",
    header: () => <div className="text-center">Teléfono</div>,
    cell: ({ getValue }) => {
      const tel = getValue() as { prefijo: string; numero: string };
      return <div className="text-center whitespace-nowrap">{`${tel.prefijo} ${tel.numero}`}</div>;
    },
  },
];

"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEditarInvitado } from "@/sesiones/sesion";

interface Invitado {
  _id: string;
  nombre: string;
  apellido: string;
  mesa?: number;
  admision?: number;
  telefono: {
    prefijo?: string;
    numero: string;
  };
}

interface EditarInvitadoDialogProps {
  invitado: Invitado | null;
  open: boolean;
  onClose: () => void;
  onOpenChange: (open: boolean) => void;
}

export function EditarInvitadoDialog({
  invitado,
  open,
  onOpenChange,
  onClose,
}: EditarInvitadoDialogProps) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [mesa, setMesa] = useState<string | "">("");
  const [admision, setAdmision] = useState<string | "">("");
  const [prefijo, setPrefijo] = useState("+593");
  const [telefono, setTelefono] = useState("");

  const mutation = useEditarInvitado();

  useEffect(() => {
    if (invitado) {
      setNombre(invitado.nombre);
      setApellido(invitado.apellido);
      setMesa(invitado.mesa !== undefined ? String(invitado.mesa) : "");
      setAdmision(invitado.admision !== undefined ? String(invitado.admision) : "");
      setPrefijo(invitado.telefono?.prefijo || "+593");
      setTelefono(invitado.telefono?.numero || "");
    }
  }, [invitado]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!invitado) return;

    mutation.mutate(
      {
        idInvitado: invitado._id,
        nombre,
        apellido,
        mesa: mesa === "" ? undefined : mesa,
        admision: admision === "" ? undefined : admision,
        telefono: {
          prefijo,
          numero: telefono,
        },
      },
      {
        onSuccess: () => {
          onOpenChange(false);
        },
      }
    );
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        if (!val) onClose();
      }}
    >
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Editar Invitado</DialogTitle>
          <DialogDescription>
            Modifica los datos del invitado y guarda los cambios.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-6 mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="nombre">Nombre</Label>
              <input
                id="nombre"
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej. Juan"
                required
                className="w-full px-3 py-2 text-sm rounded-lg border dark:bg-zinc-800 dark:border-zinc-600"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="apellido">Apellido</Label>
              <input
                id="apellido"
                type="text"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                placeholder="Ej. Pérez"
                required
                className="w-full px-3 py-2 text-sm rounded-lg border dark:bg-zinc-800 dark:border-zinc-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="mesa">Mesa</Label>
              <input
                id="mesa"
                type="number"
                value={mesa}
                onChange={(e) => setMesa(e.target.value)}
                placeholder="Ej. 5"
                min={0}
                className="w-full px-3 py-2 text-sm rounded-lg border dark:bg-zinc-800 dark:border-zinc-600"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="admision">Admisión</Label>
              <input
                id="admision"
                type="number"
                value={admision}
                onChange={(e) => setAdmision(e.target.value)}
                placeholder="Ej. 1"
                min={0}
                className="w-full px-3 py-2 text-sm rounded-lg border dark:bg-zinc-800 dark:border-zinc-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
            <div className="space-y-1">
              <Label htmlFor="prefijo">Prefijo</Label>
              <Select
                value={prefijo}
                onValueChange={setPrefijo}
              >
                <SelectTrigger className="w-full rounded-lg border px-3 py-2 text-sm dark:bg-zinc-800 dark:border-zinc-600">
                  <SelectValue placeholder="Selecciona prefijo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="+593">+593</SelectItem>
                  <SelectItem value="+57">+57</SelectItem>
                  <SelectItem value="+52">+52</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="col-span-2 space-y-1">
              <Label htmlFor="telefono">Número de Teléfono</Label>
              <input
                id="telefono"
                type="tel"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                placeholder="Ej. 987654321"
                required
                className="w-full px-3 py-2 text-sm rounded-lg border dark:bg-zinc-800 dark:border-zinc-600"
              />
            </div>
          </div>

          {mutation.isError && (
            <p className="text-red-500 text-sm mt-1">
              Error al guardar los cambios, intenta de nuevo.
            </p>
          )}

          <DialogFooter className="mt-6 flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={mutation.status === "pending"}>
              {mutation.status === "pending" ? "Guardando..." : "Guardar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

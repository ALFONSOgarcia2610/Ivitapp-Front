import { useState } from "react";
import SinDatos from "@/img/sin datos.png";
import logo from "@/img/logo.png";
import logotwo from "@/img/logo2.png";
import { Label } from "@/components/ui/label";
import { usuarioStore } from "@/Store/authstore";
import { UserRoundPlus, X, Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { guardarInvitado, obtenerInvitadosPorUsuario } from "@/database/dababase";
import { useQuery } from "@tanstack/react-query";

import { columns } from "@/pages/invitados/Columnasinivtados";
import { DataTable } from "../table/data-table";
import { toast } from "sonner";
import { DescargarQRsPDF } from "@/comunes/DescargarQRsPDF";
import { ExportExcelButton } from "@/comunes/ExportExcelButton";
import { ImportExcelInvitados } from "@/comunes/SubirExcel";

export default function Pokemon() {
  const filterConfig = {
    columnId: "nombre",
    placeholder: "Filtrar por nombre...",
    className: "max-w-sm"
  };

  // Configuración del select de estados
  const selectConfig = {
    columnId: "estado",
    options: [
      { value: "all", label: "Todos" },
      { value: "pendiente", label: "Pendiente" },
      { value: "no asistira", label: "No asistira" },
      { value: "Si asistira", label: "Asistira" },
    ],
    placeholder: "Estados",
    defaultValue: "all",
    label: "Estados",
    exactMatch: true
  };

  // Configuración del select de tamaño de página
  const pageSizeConfig = {
    options: [5, 10, 20, 50, 100],
    placeholder: "Filas por página",
    label: "Filas por página"
  };
  const [open, setOpen] = useState(false);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [mesa, setMesa] = useState<number | "">("");
  const [admision, setAdmision] = useState<number | "">("");
  const [prefijo, setPrefijo] = useState("+593");
  const [telefono, setTelefono] = useState("");
  const [refetchFlag, setRefetchFlag] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const username = usuarioStore.state.usuario ?? "";

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["invitados", username, refetchFlag],
    queryFn: () => obtenerInvitadosPorUsuario(username),
    enabled: !!username,
  });

  const invitados = data?.invitados ?? [];
  const handleGuardar = async () => {
    if (!nombre.trim() || !apellido.trim() || !telefono.trim()) {
      toast.error("Por favor completa nombre, apellido y teléfono");
      return;
    }
    try {
      await guardarInvitado({
        username,
        nombre,
        apellido,
        mesa: mesa === "" ? undefined : Number(mesa),
        admision: admision === "" ? undefined : Number(admision),
        telefono: { prefijo, numero: telefono },
      });
      toast.success("Invitado guardado exitosamente");
      setOpen(false);
      setNombre("");
      setApellido("");
      setMesa("");
      setAdmision("");
      setPrefijo("+593");
      setTelefono("");
      await refetch();
    } catch (error) {
      toast.error("Error guardando invitado. Revisa consola.");
      console.error(error);
    }
  };


  const BotonDesktop = () => (
    <div className="hidden sm:flex w-full justify-end items-center gap-3 mb-6">
      <button
        onClick={() => setOpen(true)}
        className="p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition"
      >
        <UserRoundPlus className="w-6 h-6 text-sky-600" strokeWidth={2.5} />
      </button>

      <DescargarQRsPDF invitados={invitados} />
      <ExportExcelButton invitados={invitados} />
      <ImportExcelInvitados
        username={username}
        onSuccess={() => {
          refetch();
          setRefetchFlag((prev) => !prev);
        }}
      />
    </div>
  );

  const MenuMovil = () => (
    <div className="sm:hidden fixed bottom-6 right-6 z-50">
      <div className="relative">
        {/* Backdrop blur cuando está abierto */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 -z-10 bg-black/20 backdrop-blur-sm transition-all duration-300"
            onClick={() => setIsMenuOpen(false)}
          />
        )}

        {/* Botones flotantes que aparecen */}
        <div className={cn(
          "absolute bottom-16 right-0 flex flex-col-reverse gap-3 transition-all duration-500 ease-out",
          isMenuOpen
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-8 scale-95 pointer-events-none"
        )}>
          {/* Agregar Invitado */}
          <button
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-sky-500 to-sky-600 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-sm font-medium"
            onClick={() => {
              setOpen(true);
              setIsMenuOpen(false);
            }}
          >
            <UserRoundPlus className="w-5 h-5" />
            <span>Agregar Invitado</span>
          </button>

          {/* Descargar QRs */}
          <div
            className="flex items-center gap-2 px-4 py-2.5 bg-white/95 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border border-white/30 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              const button = e.currentTarget.querySelector('button') as HTMLButtonElement;
              if (button) button.click();
              setIsMenuOpen(false);
            }}
          >
            <DescargarQRsPDF invitados={invitados} />
            <span className="text-sm font-medium text-zinc-700">Descargar QRs</span>
          </div>

          {/* Exportar Excel */}
          <div
            className="flex items-center gap-2 px-4 py-2.5 bg-white/95 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border border-white/30 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              const button = e.currentTarget.querySelector('button') as HTMLButtonElement;
              if (button) button.click();
              setIsMenuOpen(false);
            }}
          >
            <ExportExcelButton invitados={invitados} />
            <span className="text-sm font-medium text-zinc-700">Exportar Excel</span>
          </div>

          {/* Importar Excel */}
          <div
            className="flex items-center gap-2 px-4 py-2.5 bg-white/95 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border border-white/30 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              const element = e.currentTarget.querySelector('button, input') as HTMLButtonElement | HTMLInputElement;
              if (element) element.click();
              setIsMenuOpen(false);
            }}
          >
            <ImportExcelInvitados
              username={username}
              onSuccess={() => {
                refetch();
                setRefetchFlag((prev) => !prev);
                setIsMenuOpen(false);
              }}
            />
            <span className="text-sm font-medium text-zinc-700">Importar Excel</span>
          </div>
        </div>

        {/* Botón principal flotante */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={cn(
            "p-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden",
            "before:absolute before:inset-0 before:bg-gradient-to-r before:from-purple-600 before:to-pink-600 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
            isMenuOpen && "rotate-45 scale-110"
          )}
        >
          <div className="relative z-10">
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Plus className="w-6 h-6" />
            )}
          </div>
        </button>
      </div>
    </div>
  );

  const DialogAgregarInvitado = () => (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agregar Invitado</DialogTitle>
          <DialogDescription>
            Completa los datos del invitado que deseas agregar.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>Nombre</Label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej. Juan"
                className="w-full px-3 py-2 text-sm rounded-lg border dark:bg-zinc-800 dark:border-zinc-600"
              />
            </div>
            <div className="space-y-1">
              <Label>Apellido</Label>
              <input
                type="text"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                placeholder="Ej. Pérez"
                className="w-full px-3 py-2 text-sm rounded-lg border dark:bg-zinc-800 dark:border-zinc-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>Mesa</Label>
              <input
                type="number"
                value={mesa}
                onChange={(e) =>
                  setMesa(e.target.value === "" ? "" : Number(e.target.value))
                }
                placeholder="Ej. 5"
                className="w-full px-3 py-2 text-sm rounded-lg border dark:bg-zinc-800 dark:border-zinc-600"
              />
            </div>
            <div className="space-y-1">
              <Label>Admisión</Label>
              <input
                type="number"
                value={admision}
                onChange={(e) =>
                  setAdmision(e.target.value === "" ? "" : Number(e.target.value))
                }
                placeholder="Ej. 1"
                className="w-full px-3 py-2 text-sm rounded-lg border dark:bg-zinc-800 dark:border-zinc-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
            <div className="space-y-1">
              <Label>Prefijo</Label>
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
              <Label>Número de Teléfono</Label>
              <input
                type="tel"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                placeholder="Ej. 987654321"
                className="w-full px-3 py-2 text-sm rounded-lg border dark:bg-zinc-800 dark:border-zinc-600"
              />
            </div>
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button
            type="button"
            onClick={handleGuardar}
            className="w-full sm:w-auto bg-green-700 hover:bg-green-600"
          >
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">Cargando...</div>
    );
  }

  if (invitados.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen px-4">
        <div className="flex flex-col items-center justify-center h-screen px-4 text-center">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl p-6 shadow-md max-w-md w-full space-y-4">
            <div className="flex justify-center">
              <Label className="text-lg font-semibold">
                Estimado(a) {usuarioStore.state.nombre} {usuarioStore.state.apellido},<br />
                Le damos la bienvenida
              </Label>
            </div>
            <Separator />
            <img src={SinDatos} alt="IvitApp" className="w-10 mx-auto" />
            <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100">
              No se encontraron invitados
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Aún no has agregado ningún invitado. Cuando lo hagas, aparecerán aquí.
            </p>

            {/* Botón de agregar para desktop en estado sin invitados */}
            <div className="hidden sm:block">
              <Button
                onClick={() => setOpen(true)}
                className="w-full bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white border-0"
              >
                <UserRoundPlus className="w-4 h-4 mr-2" />
                Agregar Primer Invitado
              </Button>
            </div>
          </div>
        </div>

        {/* Menú flotante para móviles cuando no hay invitados */}
        <div className="sm:hidden fixed bottom-6 right-6 z-50">
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-sky-500 to-sky-600 text-white rounded-full shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 text-sm font-medium"
          >
            <UserRoundPlus className="w-5 h-5" />
            <span>Agregar Invitado</span>
          </button>
        </div>

        <DialogAgregarInvitado />
      </div>
    );
  }

  return (
    <div className="relative justify-end min-h-screen bg-transparent">
      {/* Fondo logo fijo en la parte inferior */}
      <img
        src={logo}
        alt="Logo fondo"
        className="pointer-events-none select-none fixed bottom-0 right-0 m-4 lg:w-100 w-60 opacity-20 max-w-full z-0"
        style={{ userSelect: "none" }}
      />

      {/* Contenido principal */}
      <div className="max-w-6xl mx-auto px-4 py-6 relative z-10">
        {/* Header con logo y botón */}
        <div className="flex justify-between items-center mb-6">
          <img src={logotwo} alt="Logo" className="w-30 h-auto" />
          <BotonDesktop />
        </div>

        {/* Tabla de invitados */}
        <DataTable
          columns={columns}
          filterConfig={filterConfig}
          selectConfig={selectConfig}
          pageSizeConfig={pageSizeConfig}
          showColumnToggle={true}
          data={invitados.map((inv) => ({
            ...inv,
            telefono: {
              ...inv.telefono,
              prefijo: inv.telefono.prefijo ?? "",
            },
          }))}
        />
      </div>

      <MenuMovil />
      <DialogAgregarInvitado />
    </div>
  );
}

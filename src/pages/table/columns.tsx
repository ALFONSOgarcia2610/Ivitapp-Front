"use client"
import type { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"

export type Cliente = {
  nombre: string
  correo: string
  residencia: string
  status: "Al día" | "En mora"
  credito: boolean
  montoCredito: string
}

export const columns: ColumnDef<Cliente>[] = [
  {
    accessorKey: "nombre",
     header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
         Cliente
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "residencia",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Residencia
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "correo",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "credito",
     header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ¿Tiene Credito?
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ getValue }) => (getValue() ? "Sí" : "No"),
  },
  {
  accessorKey: "status",
   header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Estado
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  cell: ({ row }) => {
    const status = row.getValue("status") as string;

    const color = {
      "Al día": "oklch(72.3% 0.219 149.579)",
      "En mora": "oklch(57.7% 0.245 27.325)"
    }[status] ?? "gray";

    return (
      <span
        className="px-2 py-1 rounded text-white text-sm"
        style={{ backgroundColor: color }}
      >
        {status}
      </span>
    );
  },
  },
  {
    accessorKey: "amount",
     header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Valor
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
 
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
    {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(payment.montoCredito);
                toast("Monto copiado", { position: "top-right" })
              }}
            >
              Copiar Monto
            </DropdownMenuItem>
            <DropdownMenuSeparator />
             <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(payment.correo);
                toast("Correo copiado", { position: "top-right" })
              }}
            >
              Copiar Correo
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(payment.nombre);
                toast("Nombre copiado", { position: "top-right" })
              }}
            >
              Copiar Nombre
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

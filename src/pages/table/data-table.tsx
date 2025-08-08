"use client"

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  type VisibilityState,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
} from "@tanstack/react-table"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  Card,
  CardContent,
} from "@/components/ui/card"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useIsMobile } from "@/hooks/use-mobile"

interface FilterConfig {
  columnId: string
  placeholder?: string
  className?: string
}

interface SelectOption {
  value: string
  label: string
}

interface SelectConfig {
  columnId: string
  options: SelectOption[]
  placeholder?: string
  defaultValue?: string
  className?: string
  label?: string
  exactMatch?: boolean // Nueva propiedad para comparación exacta
}

interface PageSizeConfig {
  options?: number[]
  defaultValue?: number
  placeholder?: string
  className?: string
  label?: string
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  filterConfig?: FilterConfig
  selectConfig?: SelectConfig
  pageSizeConfig?: PageSizeConfig
  showColumnToggle?: boolean
}

export function DataTable<TData, TValue>({
  columns,
  data,
  filterConfig,
  selectConfig,
  pageSizeConfig,
  showColumnToggle = true,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [currentStatus, setCurrentStatus] = useState(selectConfig?.defaultValue || 'all')
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const isMobile = useIsMobile()

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  // Función para renderizar datos como cards en móvil
  const renderMobileCards = () => {
    const rows = table.getRowModel().rows;
    
    if (rows.length === 0) {
      return (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No hay resultados.</p>
        </div>
      );
    }

    return (
      <div className="grid gap-3">
        {rows.map((row) => {
          const data = row.original as any;
          
          // Función para obtener el color del borde según el estado
          const getBorderColor = () => {
            if (!data.estado) return "border-l-gray-300";
            const valor = String(data.estado).toLowerCase();
            if (valor === "asistira") return "border-l-emerald-500";
            if (valor === "no asistira") return "border-l-rose-500";
            return "border-l-amber-500"; // pendiente
          };
          
          return (
            <Card key={row.id} className={`w-full shadow-sm hover:shadow-md transition-shadow duration-200 border-l-4 ${getBorderColor()}`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-base text-gray-900 dark:text-gray-100 truncate">
                      {data.nombre} {data.apellido}
                    </h3>
                    {data.estado && (
                      <div className="mt-1">
                        {(() => {
                          const valor = String(data.estado).toLowerCase();
                          const getColorClass = () => {
                            if (valor === "asistira") return "bg-emerald-50 text-emerald-700 border-emerald-200";
                            if (valor === "no asistira") return "bg-rose-50 text-rose-700 border-rose-200";
                            return "bg-amber-50 text-amber-700 border-amber-200";
                          };
                          return (
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${getColorClass()}`}>
                              {valor.charAt(0).toUpperCase() + valor.slice(1)}
                            </span>
                          );
                        })()}
                      </div>
                    )}
                  </div>
                  <div className="flex-shrink-0 ml-3">
                    {/* Renderizar acciones */}
                    {columns.find(col => col.id === "acciones")?.cell && 
                      flexRender(columns.find(col => col.id === "acciones")!.cell!, { row, getValue: () => null, column: { id: "acciones" } } as any)
                    }
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div className="text-center">
                    <span className="block text-gray-500 dark:text-gray-400 font-medium mb-1">Mesa</span>
                    <p className="font-semibold text-gray-900 dark:text-gray-100">
                      {data.mesa !== undefined && data.mesa !== null ? data.mesa : "—"}
                    </p>
                  </div>
                  <div className="text-center">
                    <span className="block text-gray-500 dark:text-gray-400 font-medium mb-1">Admisión</span>
                    <p className="font-semibold text-gray-900 dark:text-gray-100">
                      {data.admision !== undefined && data.admision !== null ? data.admision : "—"}
                    </p>
                  </div>
                  <div className="text-center">
                    <span className="block text-gray-500 dark:text-gray-400 font-medium mb-1">Teléfono</span>
                    <p className="font-semibold text-gray-900 dark:text-gray-100 text-xs">
                      {data.telefono ? `${data.telefono.prefijo} ${data.telefono.numero}` : "—"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        {filterConfig && (
          <Input
            placeholder={filterConfig.placeholder || "Filtrar..."}
            value={(table.getColumn(filterConfig.columnId)?.getFilterValue() as string) ?? ""}
            onChange={(event) => {
              setCurrentStatus(selectConfig?.defaultValue || "all");
              if (selectConfig) {
                table.getColumn(selectConfig.columnId)?.setFilterValue(undefined);
              }
              table.getColumn(filterConfig.columnId)?.setFilterValue(event.target.value);
            }}
            className={filterConfig.className || "max-w-sm"}
          />
        )}

        {selectConfig && (
          <Select
            value={currentStatus}
            onValueChange={(value) => {
              setCurrentStatus(value);
              if (value === selectConfig.defaultValue || value === 'all') {
                table.getColumn(selectConfig.columnId)?.setFilterValue(undefined);
              } else {
                table.getColumn(selectConfig.columnId)?.setFilterValue(value);
              }
            }}
          >
            <SelectTrigger className={selectConfig.className || "w-[180px]"}>
              <SelectValue placeholder={selectConfig.placeholder || "Seleccionar..."} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {selectConfig.label && <SelectLabel>{selectConfig.label}</SelectLabel>}
                {selectConfig.options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}

        {/* Ocultar toggle de columnas en móvil */}
        {showColumnToggle && !isMobile && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Columnas</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table.getAllColumns()
                .filter((column) => column.getCanHide() && column.id !== "acciones")
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        <Select
          onValueChange={(value) => {
            table.setPageSize(+value);
          }}
        >
          <SelectTrigger className={pageSizeConfig?.className || (isMobile ? "w-[120px]" : "w-[180px]")}>
            <SelectValue placeholder={pageSizeConfig?.placeholder || "10 Filas"} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {pageSizeConfig?.label && <SelectLabel>{pageSizeConfig.label}</SelectLabel>}
              {(pageSizeConfig?.options || [5, 10, 20, 40, 70, 100]).map((size) => (
                <SelectItem key={size} value={size.toString()}>
                  {size}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Vista Desktop - Tabla */}
      {!isMobile && (
        <div className="overflow-x-auto rounded-md border">
          <Table className="min-w-[800px]">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="text-center">
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="text-center whitespace-nowrap">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No hay resultados.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Vista Mobile - Cards */}
      {isMobile && (
        <div className="space-y-3">
          {renderMobileCards()}
        </div>
      )}

      {/* Paginación (compartida entre ambas vistas) */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-4 py-4">
        <div className="text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} de {table.getFilteredRowModel().rows.length} fila(s) seleccionadas.
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Regresar
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  )
}

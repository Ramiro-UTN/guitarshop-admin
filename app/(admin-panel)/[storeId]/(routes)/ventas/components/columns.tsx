"use client"

import { ColumnDef } from "@tanstack/react-table"



export type VentaColumn = {
  id: string
  nombre: string
  telefono: string
  ciudad: string
  provincia: string
  direccion: string
  codPostal: string
  pagado: string
  precioTotal: string;
  productos: string;
  createdAt: string
}

export const columns: ColumnDef<VentaColumn>[] = [
  {
    accessorKey: "productos",
    header: "Productos",
  },
  {
    accessorKey: "nombre",
    header: "Nombre",
  },
  {
    accessorKey: "telefono",
    header: "Teléfono",
  },
  {
    accessorKey: "direccion",
    header: "Dirección",
  },
  {
    accessorKey: "codPostal",
    header: "Código Postal",
  },
  {
    accessorKey: "ciudad",
    header: "Ciudad",
  },
  {
    accessorKey: "provincia",
    header: "Provincia",
  },
  
  {
    accessorKey: "precioTotal",
    header: "Precio Total",
  },
  {
    accessorKey: "pagado",
    header: "Pagado",
  },
  {
    accessorKey: "createdAt",
    header: "Fecha",
  },
]

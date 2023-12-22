"use client"

import { ColumnDef } from "@tanstack/react-table"



export type VentaColumn = {
  id: string
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
    accessorKey: "telefono",
    header: "Teléfono",
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
    accessorKey: "direccion",
    header: "Direccion",
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

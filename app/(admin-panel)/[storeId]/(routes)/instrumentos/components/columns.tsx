"use client"

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";




export type InstrumentoColumn = {
  id: string
  name: string
  cartelera: string
  createdAt: string
}

export const columns: ColumnDef<InstrumentoColumn>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "cartelera",
    header: "Cartelera",
  },
  {
    accessorKey: "createdAt",
    header: "Fecha",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  }
]

"use client"

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";




export type FormatoColumn = {
  id: string
  name: string
  createdAt: string
}

export const columns: ColumnDef<FormatoColumn>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
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

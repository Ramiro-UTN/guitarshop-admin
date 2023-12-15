"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"
import Image from "next/image"


export type CarteleraColumn = {
  id: string
  label: string
  imageUrl: string
  createdAt: string
}

export const columns: ColumnDef<CarteleraColumn>[] = [
  {
    accessorKey: "label",
    header: "Etiqueta",
  },
  {
    accessorKey: "imageUrl",
    header: "Imagen",
    cell: ({row}) => <Image alt="Imagen" height={50} width={50} src={row.original.imageUrl}/>
  },
  {
    accessorKey: "createdAt",
    header: "Fecha",
  },
  {
    id: "actions",
    cell: ({row}) => <CellAction data={row.original} />
  }
]

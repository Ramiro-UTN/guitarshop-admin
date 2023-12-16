"use client"

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import Image from "next/image";
import ImageModal from "@/components/ui/image-modal";
import ImageDisplay from "./image-display";


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
    cell: ({ row }) => <ImageDisplay data={row.original} />
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

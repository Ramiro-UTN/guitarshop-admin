"use client";


import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { VentaColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";


interface VentasClientProps {
  data: VentaColumn[]
}

export const VentasClient: React.FC<VentasClientProps> = ({
  data
}) => {

  return (
    <>
      <Heading
        tittle={`Ventas (${data.length})`}
        description="Manage orders for your store"
      />

      <Separator />
      <DataTable searchKey="products" columns={columns} data={data} />
    </>
  )
}
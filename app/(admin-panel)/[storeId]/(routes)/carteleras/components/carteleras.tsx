"use client";

import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { CarteleraColumn, columns } from "./columns";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

interface CartelerasProps {
  data: CarteleraColumn[]

}


const Carteleras: React.FC<CartelerasProps> = (
  {
    data
  }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex justify-between items-center border-b">
        <Heading tittle={`Carteleras (${data.length})`} description="Administrador de carteleras del sitio" />
        <Button onClick={() => router.push(`/${params.storeId}/carteleras/new`)}>
          <Plus className="h-4 w-4 mr-2" />
          Crear nueva
        </Button>
      </div>
      <DataTable columns={columns} data={data} searchKey="label" />

    </>
  );
}

export default Carteleras;
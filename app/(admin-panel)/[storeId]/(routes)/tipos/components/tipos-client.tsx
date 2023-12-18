"use client";

import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { TipoColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

interface TiposClientProps {
  data: TipoColumn[]

}


const TiposClient: React.FC<TiposClientProps> = (
  {
    data
  }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex justify-between items-center border-b">
        <Heading tittle={`Tipos (${data.length})`} description="Administrador de tipos de instrumento del sitio" />
        <Button onClick={() => router.push(`/${params.storeId}/tipos/new`)}>
          <Plus className="h-4 w-4 mr-2" />
          Crear nuevo
        </Button>
      </div>
      <DataTable columns={columns} data={data} searchKey="name" />

    </>
  );
}

export default TiposClient;
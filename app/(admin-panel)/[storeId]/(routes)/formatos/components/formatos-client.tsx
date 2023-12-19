"use client";

import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { FormatoColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

interface FormatosClientProps {
  data: FormatoColumn[]

}


const FormatosClient: React.FC<FormatosClientProps> = (
  {
    data
  }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex justify-between items-center border-b">
        <Heading tittle={`Formatos (${data.length})`} description="Administrador de formatos del sitio" />
        <Button onClick={() => router.push(`/${params.storeId}/formatos/new`)}>
          <Plus className="h-4 w-4 mr-2" />
          Crear nuevo
        </Button>
      </div>
      <DataTable columns={columns} data={data} searchKey="name" />

    </>
  );
}

export default FormatosClient;
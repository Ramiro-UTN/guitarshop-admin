"use client";

import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { InstrumentoColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

interface InstrumentosProps {
  data: InstrumentoColumn[]

}


const Instrumentos: React.FC<InstrumentosProps> = (
  {
    data
  }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex justify-between items-center border-b">
        <Heading tittle={`Instrumentos (${data.length})`} description="Administrador de instrumentos del sitio" />
        <Button onClick={() => router.push(`/${params.storeId}/instrumentos/new`)}>
          <Plus className="h-4 w-4 mr-2" />
          Crear nueva
        </Button>
      </div>
      <DataTable columns={columns} data={data} searchKey="name" />

    </>
  );
}

export default Instrumentos;
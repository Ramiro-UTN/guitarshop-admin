"use client";

import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { MaderaColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

interface MaderasClientProps {
  data: MaderaColumn[]

}


const MaderasClient: React.FC<MaderasClientProps> = (
  {
    data
  }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex justify-between items-center border-b">
        <Heading tittle={`Maderas (${data.length})`} description="Administrador de maderas del sitio" />
        <Button onClick={() => router.push(`/${params.storeId}/maderas/new`)}>
          <Plus className="h-4 w-4 mr-2" />
          Crear nueva
        </Button>
      </div>
      <DataTable columns={columns} data={data} searchKey="name" />

    </>
  );
}

export default MaderasClient;
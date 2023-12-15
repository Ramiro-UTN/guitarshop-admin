"use client";

import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Cartelera } from "@prisma/client";

interface CartelerasProps {
  data: Cartelera[]

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

    </>
  );
}

export default Carteleras;
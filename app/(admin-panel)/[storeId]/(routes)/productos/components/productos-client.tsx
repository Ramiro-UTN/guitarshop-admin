"use client";

import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ProductoColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

interface ProductosClientProps {
  data: ProductoColumn[]

}


const ProductosClient: React.FC<ProductosClientProps> = (
  {
    data
  }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex justify-between items-center border-b">
        <Heading tittle={`Productos (${data.length})`} description="Administrador de productos del sitio" />
        <Button onClick={() => router.push(`/${params.storeId}/productos/new`)}>
          <Plus className="h-4 w-4 mr-2" />
          Crear nuevo
        </Button>
      </div>
      <DataTable columns={columns} data={data} searchKey="name" />

    </>
  );
}

export default ProductosClient;
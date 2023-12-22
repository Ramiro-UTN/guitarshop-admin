import prismadb from "@/lib/prismadb";
import ProductoForm from "./components/producto-form";
import { Prisma } from '@prisma/client'
export type instrumentoWithTipos = Prisma.InstrumentoGetPayload<{
  include: { tipos: true }
}>



const ProductoPage = async ({
  params
}: {
  params: { storeId: string, productoId: string }
}) => {

  const producto = await prismadb.producto.findUnique({
    where: {
      id: params.productoId
    },
    include: {
      images: true,
    }
  });



  const instrumentos = await prismadb.instrumento.findMany({
    where: {
      storeId: params.storeId
    },
    include: {
      tipos: true,
    }
  });

  const formatos = await prismadb.formato.findMany({
    where: {
      storeId: params.storeId
    }
  });

  const maderas = await prismadb.madera.findMany({
    where: {
      storeId: params.storeId
    }
  });


  const tipos = await prismadb.tipo.findMany({
    where: {
      storeId: params.storeId,
    }
  });


  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductoForm
          data={producto}
          instrumentos={instrumentos}
          tipos={tipos}
          formatos={formatos}
          maderas={maderas}
        />
      </div>
    </div>
  );
}

export default ProductoPage;
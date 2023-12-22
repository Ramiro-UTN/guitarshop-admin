import prismadb from "@/lib/prismadb";
import ProductosClient from "./components/productos-client";
import { ProductoColumn } from "./components/columns";

const ProductosPage = async ({
  params
}: {
  params: { storeId: string }
}) => {


  const productos = await prismadb.producto.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedProductos: ProductoColumn[] = productos.map((producto) => ({
    id: producto.id,
    name: producto.name,
    createdAt: producto.createdAt.toLocaleString('es', { year: 'numeric', month: 'long', day: 'numeric' })

  }));

  return (
    <div className="flex-col">
      <div className="p-8 pt-6 ">
        <ProductosClient data={formattedProductos} />
      </div>
    </div>
  );
}

export default ProductosPage;
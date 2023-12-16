import prismadb from "@/lib/prismadb";
import Carteleras from "./components/carteleras";
import { CarteleraColumn } from "./components/columns";

const CartelerasPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  const carteleras = await prismadb.cartelera.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedCarteleras: CarteleraColumn[] = carteleras.map((cartelera) => ({
    id: cartelera.id,
    label: cartelera.label,
    imageUrl: cartelera.imageUrl,
    createdAt: cartelera.createdAt.toLocaleString('es',{year:'numeric', month:'long', day:'numeric'})

  }));

  return (
    <div className="flex-col">
      <div className="p-8 pt-6 ">
        <Carteleras data={formattedCarteleras} />
      </div>
    </div>
  );
}

export default CartelerasPage;
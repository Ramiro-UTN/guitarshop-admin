import prismadb from "@/lib/prismadb";
import Carteleras from "./components/carteleras";

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
  

  return (
    <div className="flex-col">
      <div className="p-8 pt-6 ">
        <Carteleras data={carteleras} />
      </div>
    </div>
  );
}

export default CartelerasPage;
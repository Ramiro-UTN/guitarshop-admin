import prismadb from "@/lib/prismadb";
import InstrumentoForm from "./components/instrumento-form";

const CarteleraPage = async ({
  params
}: {
  params: { carteleraId: string, instrumentoId: string }
}) => {

  const instrumento = await prismadb.instrumento.findUnique({
    where: {
      id: params.instrumentoId
    }
  })

  const carteleras = await prismadb.cartelera.findMany({
    where: {
      id: params.carteleraId
    }
  })

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <InstrumentoForm data={instrumento} carteleras={carteleras} />
      </div>
    </div>
  );
}

export default CarteleraPage;
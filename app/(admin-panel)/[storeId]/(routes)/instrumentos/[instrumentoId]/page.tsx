import prismadb from "@/lib/prismadb";
import InstrumentoForm from "./components/instrumento-form";

const InstrumentoPage = async ({
  params
}: {
  params: { storeId: string, instrumentoId: string }
}) => {

  const instrumento = await prismadb.instrumento.findUnique({
    where: {
      id: params.instrumentoId
    }
  })

  const carteleras = await prismadb.cartelera.findMany({
    where: {
      storeId: params.storeId,
    }
  })

  console.log("CARTELERAS: ", carteleras);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <InstrumentoForm data={instrumento} carteleras={carteleras} />
      </div>
    </div>
  );
}

export default InstrumentoPage;
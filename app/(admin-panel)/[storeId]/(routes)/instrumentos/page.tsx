import prismadb from "@/lib/prismadb";
import Instrumentos from "./components/instrumentos";
import { InstrumentoColumn } from "./components/columns";

const InstrumentosPage = async ({
  params
}: {
  params: { storeId: string }
}) => {


  const instrumentos = await prismadb.instrumento.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      cartelera: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedInstrumentos: InstrumentoColumn[] = instrumentos.map((instrumento) => ({
    id: instrumento.id,
    name: instrumento.name,
    cartelera: instrumento.cartelera.label,
    createdAt: instrumento.createdAt.toLocaleString('es', { year: 'numeric', month: 'long', day: 'numeric' })

  }));

  return (
    <div className="flex-col">
      <div className="p-8 pt-6 ">
        <Instrumentos data={formattedInstrumentos} />
      </div>
    </div>
  );
}

export default InstrumentosPage;
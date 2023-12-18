import prismadb from "@/lib/prismadb";
import InstrumentosClient from "./components/instrumentos-client";
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
      tipos: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedInstrumentos: InstrumentoColumn[] = instrumentos.map((instrumento) => ({
    id: instrumento.id,
    name: instrumento.name,
    tipos: instrumento.tipos.map(tipo => tipo.name.trim()).join(', '),
    cartelera: instrumento.cartelera.label,
    createdAt: instrumento.createdAt.toLocaleString('es', { year: 'numeric', month: 'long', day: 'numeric' })

  }));

  return (
    <div className="flex-col">
      <div className="p-8 pt-6 ">
        <InstrumentosClient data={formattedInstrumentos} />
      </div>
    </div>
  );
}

export default InstrumentosPage;
import prismadb from "@/lib/prismadb";
import TiposClient from "./components/tipos-client";
import { TipoColumn } from "./components/columns";

const TiposPage = async ({
  params
}: {
  params: { storeId: string }
}) => {


  const tipos = await prismadb.tipo.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      instrumento: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedTipos: TipoColumn[] = tipos.map((tipo) => ({
    id: tipo.id,
    name: tipo.name,
    instrumento: tipo.instrumento.name,
    createdAt: tipo.createdAt.toLocaleString('es', { year: 'numeric', month: 'long', day: 'numeric' })

  }));

  return (
    <div className="flex-col">
      <div className="p-8 pt-6 ">
        <TiposClient data={formattedTipos} />
      </div>
    </div>
  );
}

export default TiposPage;
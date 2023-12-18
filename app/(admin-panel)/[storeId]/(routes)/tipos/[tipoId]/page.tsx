import prismadb from "@/lib/prismadb";
import TipoForm from "./components/tipo-form";

const TipoPage = async ({
  params
}: {
  params: { storeId: string, tipoId: string }
}) => {

  const tipo = await prismadb.tipo.findUnique({
    where: {
      id: params.tipoId
    }
  });

  const instrumentos = await prismadb.instrumento.findMany({
    where: {
      storeId: params.storeId
    }
  });


  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <TipoForm data={tipo} instrumentos={instrumentos} />
      </div>
    </div>
  );
}

export default TipoPage;
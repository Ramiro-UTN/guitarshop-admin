import prismadb from "@/lib/prismadb";
import FormatoForm from "./components/formato-form";

const FormatoPage = async ({
  params
}: {
  params: { formatoId: string, storeId: string }
}) => {

  const formato = await prismadb.formato.findUnique({
    where: {
      id: params.formatoId,
    }
  });

  const instrumentos = await prismadb.instrumento.findMany({
    where: {
      storeId: params.storeId,
    }
  });



  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <FormatoForm data={formato} instrumentos={instrumentos}/>
      </div>
    </div>
  );
}

export default FormatoPage;
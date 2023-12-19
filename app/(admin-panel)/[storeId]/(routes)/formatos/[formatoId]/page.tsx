import prismadb from "@/lib/prismadb";
import FormatoForm from "./components/formato-form";

const FormatoPage = async ({
  params
}: {
  params: { formatoId: string }
}) => {

  const formato = await prismadb.formato.findUnique({
    where: {
      id: params.formatoId,
    }
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <FormatoForm data={formato} />
      </div>
    </div>
  );
}

export default FormatoPage;
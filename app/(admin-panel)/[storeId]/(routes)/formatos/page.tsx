import prismadb from "@/lib/prismadb";
import FormatosClient from "./components/formatos-client";
import { FormatoColumn } from "./components/columns";

const FormatosPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  const formatos = await prismadb.formato.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedFormatos: FormatoColumn[] = formatos.map((formato) => ({
    id: formato.id,
    name: formato.name,
    createdAt: formato.createdAt.toLocaleString('es',{year:'numeric', month:'long', day:'numeric'})

  }));

  return (
    <div className="flex-col">
      <div className="p-8 pt-6 ">
        <FormatosClient data={formattedFormatos} />
      </div>
    </div>
  );
}

export default FormatosPage;
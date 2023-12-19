import prismadb from "@/lib/prismadb";
import FormatosClient from "./components/maderas-client";
import { MaderaColumn } from "./components/columns";

const MaderasPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  const maderas = await prismadb.madera.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedMaderas: MaderaColumn[] = maderas.map((madera) => ({
    id: madera.id,
    name: madera.name,
    createdAt: madera.createdAt.toLocaleString('es', { year: 'numeric', month: 'long', day: 'numeric' })

  }));

  return (
    <div className="flex-col">
      <div className="p-8 pt-6 ">
        <FormatosClient data={formattedMaderas} />
      </div>
    </div>
  );
}

export default MaderasPage;
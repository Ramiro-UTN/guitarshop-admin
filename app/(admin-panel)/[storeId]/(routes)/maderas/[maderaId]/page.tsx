import prismadb from "@/lib/prismadb";
import MaderaForm from "./components/madera-form";

const MaderaPage = async ({
  params
}: {
  params: { maderaId: string }
}) => {

  const madera = await prismadb.madera.findUnique({
    where: {
      id: params.maderaId,
    }
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <MaderaForm data={madera} />
      </div>
    </div>
  );
}

export default MaderaPage;
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";
import Navbar from "@/components/navbar";

export default async function AdminPanelLayout({
  children,
  params
}: {
  children: React.ReactNode,
  params: { storeId: string }
}) {
  const { userId } = auth();

  if (!userId) redirect('/');

  //validar que el usuario tenga acceso al store
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId
    }
  });

  if (!store) redirect('/');

  return (
    <>
      <Navbar />
      {children}
    </>
  )
}
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";

export default async function AdminPanelLayout({
  children,
  params
}: {
  children: React.ReactNode,
  params: { storeId: string }
}) {
  const { userId } = auth();

  if (!userId) redirect('/');

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId
    }
  });

  if (!store) redirect('/');

  return (
    <>
      {children}
    </>
  )
}
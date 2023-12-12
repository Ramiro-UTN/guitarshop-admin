import { UserButton } from "@clerk/nextjs"
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";


export default async function RootPage() {
  const { userId } = auth();

  if (!userId) redirect("sign-in");

  const store = await prismadb.store.findFirst({
    where: {
      userId
    }
  });

  if (store) redirect(`/${store.id}`);

  console.log(store);

  return null;
}

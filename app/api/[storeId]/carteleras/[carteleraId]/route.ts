import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { carteleraId: string } }
) {
  try {
   
    if (!params.carteleraId) {
      return new NextResponse("CarteleraId is required", { status: 400 });
    }

    const cartelera = await prismadb.cartelera.findUnique({
      where: {
        id: params.carteleraId,
      }
    });
    return NextResponse.json(cartelera);

  } catch (error) {
    console.log('[CARTELERA_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }

}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string, carteleraId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }


    if (!params.carteleraId) {
      return new NextResponse("CarteleraId is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const cartelera = await prismadb.cartelera.deleteMany({
      where: {
        id: params.carteleraId,
      }
    });
    return NextResponse.json(cartelera);

  } catch (error) {
    console.log('[CARTELERA_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }

}
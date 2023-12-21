import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { instrumentoId: string } }
) {
  try {

    if (!params.instrumentoId) {
      return new NextResponse("instrumentoId is required", { status: 400 });
    }

    const instrumento = await prismadb.instrumento.findUnique({
      where: {
        id: params.instrumentoId,
      }
    });
    return NextResponse.json(instrumento);

  } catch (error) {
    console.log('[INSTRUMENTO_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }

}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string, instrumentoId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }


    if (!params.instrumentoId) {
      return new NextResponse("instrumentoId is required", { status: 400 });
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

    const instrumento = await prismadb.instrumento.deleteMany({
      where: {
        id: params.instrumentoId,
      }
    });
    return NextResponse.json(instrumento);

  } catch (error) {
    console.log('[INSTRUMENTO_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }

}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string, instrumentoId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name, carteleraId } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!carteleraId) {
      return new NextResponse("Cartelera ID is required", { status: 400 });
    }

    if (!params.instrumentoId) {
      return new NextResponse("instrumentoId is required", { status: 400 });
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

    const instrumento = await prismadb.instrumento.updateMany({
      where: {
        id: params.instrumentoId,
      },
      data: {
        name,
        carteleraId,
      }
    });
    return NextResponse.json(instrumento);

  } catch (error) {
    console.log('[INSTRUMENTO_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }

}
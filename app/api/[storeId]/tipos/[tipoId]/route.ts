import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { tipoId: string } }
) {
  try {

    if (!params.tipoId) {
      return new NextResponse("tipoId is required", { status: 400 });
    }

    const tipo = await prismadb.tipo.findUnique({
      where: {
        id: params.tipoId,
      }
    });
    return NextResponse.json(tipo);

  } catch (error) {
    console.log('[TIPO_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }

}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string, tipoId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }


    if (!params.tipoId) {
      return new NextResponse("tipoId is required", { status: 400 });
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

    const tipo = await prismadb.tipo.deleteMany({
      where: {
        id: params.tipoId,
      }
    });
    return NextResponse.json(tipo);

  } catch (error) {
    console.log('[TIPO_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }

}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string, tipoId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name, instrumentoId } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!instrumentoId) {
      return new NextResponse("Instrumento ID is required", { status: 400 });
    }

    if (!params.tipoId) {
      return new NextResponse("tipoId is required", { status: 400 });
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

    const tipo = await prismadb.tipo.updateMany({
      where: {
        id: params.tipoId,
      },
      data: {
        name,
        instrumentoId,
      }
    });
    return NextResponse.json(tipo);

  } catch (error) {
    console.log('[TIPO_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }

}
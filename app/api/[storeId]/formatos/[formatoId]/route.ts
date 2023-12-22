import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { formatoId: string } }
) {
  try {

    if (!params.formatoId) {
      return new NextResponse("FormatoId is required", { status: 400 });
    }

    const formato = await prismadb.formato.findUnique({
      where: {
        id: params.formatoId,
      }
    });
    return NextResponse.json(formato);

  } catch (error) {
    console.log('[FORMATO_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }

}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string, formatoId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }


    if (!params.formatoId) {
      return new NextResponse("formatoId is required", { status: 400 });
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

    const formato = await prismadb.formato.deleteMany({
      where: {
        id: params.formatoId,
      }
    });
    return NextResponse.json(formato);

  } catch (error) {
    console.log('[FORMATO_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }

}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string, formatoId: string } }
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

    if (!params.formatoId) {
      return new NextResponse("formatoId is required", { status: 400 });
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

    const formato = await prismadb.formato.updateMany({
      where: {
        id: params.formatoId,
      },
      data: {
        name,
        instrumentoId,
      }
    });
    return NextResponse.json(formato);

  } catch (error) {
    console.log('[FORMATO_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }

}
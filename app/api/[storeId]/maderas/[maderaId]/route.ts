import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { maderaId: string } }
) {
  try {

    if (!params.maderaId) {
      return new NextResponse("MaderaId is required", { status: 400 });
    }

    const madera = await prismadb.madera.findUnique({
      where: {
        id: params.maderaId,
      }
    });
    return NextResponse.json(madera);

  } catch (error) {
    console.log('[MADERA_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }

}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string, maderaId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }


    if (!params.maderaId) {
      return new NextResponse("maderaId is required", { status: 400 });
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

    const madera = await prismadb.madera.deleteMany({
      where: {
        id: params.maderaId,
      }
    });
    return NextResponse.json(madera);

  } catch (error) {
    console.log('[MADERA_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }

}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string, maderaId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!params.maderaId) {
      return new NextResponse("maderaId is required", { status: 400 });
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

    const madera = await prismadb.madera.updateMany({
      where: {
        id: params.maderaId,
      },
      data: {
        name,
      }
    });
    return NextResponse.json(madera);

  } catch (error) {
    console.log('[FORMATO_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }

}
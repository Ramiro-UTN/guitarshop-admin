import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    //verificar usuario
    const { userId } = auth();
    const body = await req.json();

    const { name } = body;


    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Label is required", { status: 400 });
    }
  
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
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

    const formato = await prismadb.formato.create({
      data: {
        name,
        storeId: params.storeId
      }
    })


    return NextResponse.json(formato);

  } catch (error) {
    console.log('FORMATOS_POST', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    const formatos = await prismadb.formato.findMany({
      where: {
        storeId: params.storeId
      }
    });

    return NextResponse.json(formatos);

  } catch (error) {
    console.log("[FORMATOS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
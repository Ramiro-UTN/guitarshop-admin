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

    //tipoId es opcional
    const {
      name,
      price,
      instrumentoId,
      tipoId,
      formatoId,
      fondo,
      tapa,
      aros,
      diapason,
      puente,
      mastil,
      exhibir,
      archivar,
      audioUrl,
      images } = body;


    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!price) {
      return new NextResponse("Price is required", { status: 400 });
    }
    if (!instrumentoId) {
      return new NextResponse("Instrumento Id is required", { status: 400 });
    }
    if (!fondo) {
      return new NextResponse("fondo is required", { status: 400 });
    }
    if (!tapa) {
      return new NextResponse("tapa is required", { status: 400 });
    }
    if (!aros) {
      return new NextResponse("aros is required", { status: 400 });
    }
    if (!diapason) {
      return new NextResponse("diapason is required", { status: 400 });
    }
    if (!puente) {
      return new NextResponse("diapason is required", { status: 400 });
    }
    if (!mastil) {
      return new NextResponse("diapason is required", { status: 400 });
    }

    if (!images || !images.length) {
      return new NextResponse("Images are required", { status: 400 });
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

    console.log("BODY: ", body)

    const producto = await prismadb.producto.create({
      data: {
        name,
        price,
        instrumentoId,
        tipoId,
        formatoId,
        fondo,
        tapa,
        aros,
        diapason,
        puente,
        mastil,
        exhibir,
        archivar,
        audioUrl,
        storeId: params.storeId,
        images:  {
          createMany: {
            data: [
              ...images.map((image: { url: string }) => image)
            ]
          }
        },
      }
    })




    console.log("PRODUCTO_POST: ", producto);


    return NextResponse.json(producto);

  } catch (error) {
    console.log('PRODUCTOS_ERROR', error);
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

    const productos = await prismadb.producto.findMany({
      where: {
        storeId: params.storeId
      }
    });


    return NextResponse.json(productos);

  } catch (error) {
    console.log("[PRODUCTOS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
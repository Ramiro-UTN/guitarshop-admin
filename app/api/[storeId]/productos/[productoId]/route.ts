import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { productoId: string } }
) {
  try {

    if (!params.productoId) {
      return new NextResponse("productoId is required", { status: 400 });
    }

    const producto = await prismadb.producto.findUnique({
      where: {
        id: params.productoId,
      }
    });
    return NextResponse.json(producto);

  } catch (error) {
    console.log('[PRODUCTO_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }

}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string, productoId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.storeId) {
      return new NextResponse("storeId is required", { status: 400 });
    }

    if (!params.productoId) {
      return new NextResponse("productoId is required", { status: 400 });
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

    const producto = await prismadb.producto.deleteMany({
      where: {
        id: params.productoId,
      }
    });
    return NextResponse.json(producto);

  } catch (error) {
    console.log('[PRODUCTO_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }

}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string, productoId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

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
    if (!mastil) {
      return new NextResponse("diapason is required", { status: 400 });
    }
    if (!params.storeId) {
      return new NextResponse("storeId is required", { status: 400 });
    }
    if (!params.productoId) {
      return new NextResponse("productoId is required", { status: 400 });
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

    await prismadb.producto.update({
      where: {
        id: params.productoId,
      },
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
        images: {
          deleteMany: {},
        },
      }
    });

    const producto = await prismadb.producto.update({
      where: {
        id: params.productoId
      },
      data: {
        images: {
          createMany: {
            data: [
              ...images.map((image: { url: string }) => image),
            ]
          }
        }
      }
    })
    return NextResponse.json(producto);

  } catch (error) {
    console.log('[PRODUCTO_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }

}
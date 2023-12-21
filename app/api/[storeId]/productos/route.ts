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
    const { name, instrumentoId, tipoId } = body;
    console.log("BODY: ",body)

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!instrumentoId) {
      return new NextResponse("Instrumento Id is required", { status: 400 });
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



    return NextResponse.json("OK");

  } catch (error) {
    console.log('PRODUCTOS_ERROR', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

// export async function GET(
//   req: Request,
//   { params }: { params: { storeId: string } }
// ) {
//   try {
//     if (!params.storeId) {
//       return new NextResponse("Store ID is required", { status: 400 });
//     }

//     const instrumentos = await prismadb.instrumento.findMany({
//       where: {
//         storeId: params.storeId
//       }
//     });


//     return NextResponse.json(instrumentos);

//   } catch (error) {
//     console.log("[INSTRUMENTOS_GET]", error);
//     return new NextResponse("Internal error", { status: 500 });
//   }
// }
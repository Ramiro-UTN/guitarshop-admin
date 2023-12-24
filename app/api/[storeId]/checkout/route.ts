import axios from "axios";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

interface formattedProductosProps {
  title: string;
  picture_url: string;
  category_id: string;
  quantity: number;
  unit_price: number;

}


const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {


  const url = "https://api.mercadopago.com/checkout/preferences";

  const {
    productosIds,
    nombre,
    apellido,
    telefono,
    ciudad,
    provincia,
    direccion,
    codPostal } = await req.json();

  if (!productosIds || productosIds.length === 0) {
    return new NextResponse("Products Ids are required", { status: 400 });
  }
  if (!nombre) {
    return new NextResponse("Nombre is required", { status: 400 });
  }
  if (!apellido) {
    return new NextResponse("Apellido is required", { status: 400 });
  }
  
  if (!telefono) {
    return new NextResponse("Telefono is required", { status: 400 });
  }
  
  if (!ciudad) {
    return new NextResponse("Ciudad is required", { status: 400 });
  }
  if (!provincia) {
    return new NextResponse("Provincia is required", { status: 400 });
  }
  if (!direccion) {
    return new NextResponse("Dirección is required", { status: 400 });
  }
  if (!codPostal) {
    return new NextResponse("Código Postal is required", { status: 400 });
  }
  
  

  const productos = await prismadb.producto.findMany({
    where: {
      id: {
        in: productosIds
      }
    },
    include: {
      images: true,
      instrumento: true,
    }
  });


  const formattedProductos: Array<formattedProductosProps> = [];

  productos.forEach((producto) => {
    formattedProductos.push({
      title: producto.name,
      picture_url: producto.images[0].url,
      category_id: producto.instrumento.name,
      quantity: 1,
      unit_price: Number(producto.price),
    })
  });

  const venta = await prismadb.venta.create({
    data: {
      storeId: params.storeId,
      pagado: false,
      nombre,
      apellido,
      ciudad,
      provincia,
      telefono,
      direccion,
      codPostal,
      items: {
        create: productosIds.map((productoId: string) => ({
          producto: {
            connect: {
              id: productoId
            }
          }
        }))
      }
    }
  });


  const body = {
    items: formattedProductos,
    metadata: {
      ventaId: venta.id
    },
    back_urls: {
      failure: `${process.env.FRONTEND_STORE_URL}/carrito?canceled=1`,
      pending: "",
      success: `${process.env.FRONTEND_STORE_URL}/carrito?success=1`
    }
  };

  const payment = await axios.post(url, body, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.MERCADOPAGO_TOKEN}`
    }
  });


  return NextResponse.json(payment.data, { headers: corsHeaders })

}
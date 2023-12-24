import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import axios from "axios";


export async function POST(req: Request) {

  const body = await req.json();

  if (body.action === "payment.created") {
    
    try {
      const paymentId = body.data.id;

      const paymentQuery = await axios.get(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.MERCADOPAGO_TOKEN}`,

        }
      })

      const paymentData = await paymentQuery.data;

      // console.log("PAYMENT_DATA:", paymentData);
      
      const venta = await prismadb.venta.update({
        where: {
          id: paymentData?.metadata?.venta_id,
        },
        data: {
          pagado: true,
        },
        include: {
          items: true,
        }
      });

      const productosIds = venta.items.map((item) => item.productoId)

      await prismadb.producto.updateMany({
        where: {
          id: {
            in: [...productosIds],
          }
        },
        data: {
          archivar: true,
        }
      });

      return new NextResponse("OK", { status: 200 });

    } catch (error: any) {
      console.log("PAYMENT_ERROR: ", error)
      return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
    }
  }

  

}
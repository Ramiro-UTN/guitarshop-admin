import prismadb from "@/lib/prismadb";
import { VentasClient } from "./components/ventas-client";
import { VentaColumn } from "./components/columns";
import { formatter } from "@/lib/utils";

const VentasPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  const ventas = await prismadb.venta.findMany({
    where: {
      storeId: params.storeId
    },
    include: {
      items: {
        include: {
          producto: true,
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedVentas: VentaColumn[] = ventas.map((venta) => ({
    id: venta.id,
    telefono: venta.telefono,
    ciudad: venta.ciudad,
    provincia: venta.provincia,
    direccion: venta.direccion,
    codPostal: venta.codPostal,
    productos: venta.items.map((item) => item.producto.name).join(', '),
    precioTotal: formatter.format(venta.items.reduce((total, venta) => {
      return total + Number(venta.producto.price)
    }, 0)),
    pagado: venta.pagado ? "Si" : "No",

    createdAt: venta.createdAt.toLocaleString('es', { year: 'numeric', month: 'long', day: 'numeric' })

  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <VentasClient data={formattedVentas} />

      </div>
    </div>
  )
}

export default VentasPage;
import prismadb from "@/lib/prismadb";
import CarteleraForm from "./components/cartelera-form";

const CarteleraPage = async ({
  params
}: {
  params: {carteleraId: string}
}) => {

  const cartelera = await prismadb.cartelera.findUnique({
    where: {
      id: params.carteleraId
    }
  })

  // const cartelera = {
  //   id: "1233",
  //   storeId: "sdsafdgfgfd",
  //   label: "ramiro", 
  //   imageUrl: "/abvddd",
  //   createdAt: new Date(),
  //   updatedAt: new Date(),
  // }
  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CarteleraForm data={cartelera}/>
      </div>
    </div>
   );
}
 
export default CarteleraPage;
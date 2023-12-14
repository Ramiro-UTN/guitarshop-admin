"use client";

import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormLabel, FormControl, FormItem, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

import { Cartelera } from "@prisma/client";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import ImageUpload from "@/components/ui/image-upload";
import { useState } from "react";
import DeleteModal from "@/components/ui/delete-modal";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";


interface CarteleraFormProps {
  data: Cartelera | null
}

const formSchema = z.object({
  label: z.string().min(1, { message: "Ingresa el nombre de la cartelera" }),
  imageUrl: z.string().min(1, { message: "Debes subir una imagen" }),
})

type CarteleraFormValues = z.infer<typeof formSchema>

const CarteleraForm: React.FC<CarteleraFormProps> = ({
  data
}) => {

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();

  const title = data ? "Editar cartelera" : "Crear cartelera";
  const description = data ? "Edita una cartelera" : "Crea una nueva cartelera";
  const toastMessage = data ? "Cartelera actualizada" : "Cartelera creada";
  const action = data ? "Guardar cambios" : "Crear";

  const form = useForm<CarteleraFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: data || {
      label: "",
      imageUrl: ""
    }

  })

  const onSubmit = async (values: CarteleraFormValues) => {
    try {
      setLoading(true);
      if (!data) {
        await axios.post(`/api/${params.storeId}/carteleras`, values);
      } else {
        await axios.patch(`/api/${params.storeId}/carteleras/${params.carteleraId}`, values);
      }
      router.refresh();
      router.push(`/${params.storeId}/carteleras`);
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Algo salió mal, vuelva a intentarlo.");
    } finally {
      setLoading(false);
    }
  }

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/carteleras/${params.carteleraId}`);
      router.refresh();
      router.push(`/${params.storeId}/carteleras`);
      toast.success("Cartelera eliminada con éxito.");
    } catch (error) {
      toast.error("Primero elimina todos los intrumentos que usan esta cartelera.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }

  return (
    <>
      <DeleteModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex justify-between items-center">
        <Heading tittle={title} description={description} />
        {data && (
          <Button
            variant="destructive"
            size="icon"
            onClick={() => setOpen(true)}
          >
            <Trash className="w-4 h-4" />
          </Button>)}
      </div>

      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Imagen de Fondo</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={false}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}

                  />
                </FormControl>
                <FormDescription>
                  Imagen de fondo que se mostrará en la cartelera
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid sm:grid-cols-1 md:grid-cols-3">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="cartelera..." {...field} />
                  </FormControl>
                  <FormDescription>
                    Etiqueta que se mostrará en la cartelera
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={loading}>{action}</Button>
        </form>
      </Form>

    </>

  );
}

export default CarteleraForm;
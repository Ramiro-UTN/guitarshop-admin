"use client";

import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormLabel, FormControl, FormItem, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

import { Formato } from "@prisma/client";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import ImageUpload from "@/components/ui/image-upload";
import { useState } from "react";
import DeleteModal from "@/components/ui/delete-modal";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";


interface FormatoFormProps {
  data: Formato | null
}

const formSchema = z.object({
  name: z.string().min(1, { message: "Ingresa el nombre del formato" }),
})

type FormatoFormValues = z.infer<typeof formSchema>

const FormatoForm: React.FC<FormatoFormProps> = ({
  data
}) => {

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();

  const title = data ? "Editar formato" : "Crear formato";
  const description = data ? "Edita unaformato" : "Crea un nueva formato";
  const toastMessage = data ? "Formato actualizado" : "Formato creado";
  const action = data ? "Guardar cambios" : "Crear";

  const form = useForm<FormatoFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: data || {
      name: "",
    }

  })

  const onSubmit = async (values: FormatoFormValues) => {
    try {
      setLoading(true);
      if (!data) {
        await axios.post(`/api/${params.storeId}/formatos`, values);
      } else {
        await axios.patch(`/api/${params.storeId}/formatos/${params.formatoId}`, values);
      }

      router.push(`/${params.storeId}/formatos`);
      router.refresh();
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
      await axios.delete(`/api/${params.storeId}/formatos/${params.formatoId}`);
      router.push(`/${params.storeId}/formatos`);
      router.refresh();
      toast.success("Formato eliminado con éxito.");
    } catch (error) {
      toast.error("Primero elimina todos los productos que usan este formato.");
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
          
          <div className="grid sm:grid-cols-1 md:grid-cols-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre del Formato</FormLabel>
                  <FormControl>
                    <Input placeholder="Formato..." {...field} />
                  </FormControl>
                  <FormDescription>
                    Formato de caja del instrumento.
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

export default FormatoForm;
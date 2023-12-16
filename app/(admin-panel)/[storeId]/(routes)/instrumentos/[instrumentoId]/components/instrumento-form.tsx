"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Cartelera, Instrumento } from "@prisma/client";
import {
  Form,
  FormField,
  FormLabel,
  FormControl,
  FormItem,
  FormMessage,
  FormDescription
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import DeleteModal from "@/components/ui/delete-modal";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";


interface InstrumentoFormProps {
  data: Instrumento | null;
  carteleras: Cartelera[];

}

const formSchema = z.object({
  name: z.string().min(1, { message: "Ingresa el nombre del instrumento" }),
  carteleraId: z.string().min(1, { message: "Debes agregar una cartelera" }),
})

type InstrumentoFormValues = z.infer<typeof formSchema>

const InstrumentoForm: React.FC<InstrumentoFormProps> = ({
  data,
  carteleras
}) => {

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();

  const title = data ? "Editar instrumento" : "Crear instrumento";
  const description = data ? "Edita un instrumento" : "Crea un nuevo instrumento";
  const toastMessage = data ? "Instrumento actualizado" : "Instrumento creado";
  const action = data ? "Guardar cambios" : "Crear";

  const form = useForm<InstrumentoFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: data || {
      name: "",
      carteleraId: "",
    }

  })

  const onSubmit = async (values: InstrumentoFormValues) => {
    try {
      setLoading(true);
      if (!data) {
        await axios.post(`/api/${params.storeId}/instrumentos`, values);
      } else {
        await axios.patch(`/api/${params.storeId}/instrumentos/${params.instrumentoId}`, values);
      }

      router.push(`/${params.storeId}/instrumentos`);
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
      await axios.delete(`/api/${params.storeId}/instrumentos/${params.instrumentoId}`);
      router.push(`/${params.storeId}/instrumentos`);
      router.refresh();
      toast.success("Instrumento eliminado con éxito.");
    } catch (error) {
      toast.error("Primero elimina todos los productos que usan este instrumento.");
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
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="nombre del instrumento..." {...field} />
                  </FormControl>
                  <FormDescription>
                    Etiqueta que se mostrará en la cartelera
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="carteleraId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cartelera</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value} defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Selecciona una cartelera"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {carteleras.map((cartelera) => (
                        <SelectItem
                          key={cartelera.id}
                          value={cartelera.id}
                        >
                          {cartelera.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Cartelera en la que se mostrará el instrumento
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={loading}>
            {action}
          </Button>
        </form>
      </Form>

    </>

  );
}

export default InstrumentoForm;
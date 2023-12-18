"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Instrumento, Tipo } from "@prisma/client";
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


interface TipoFormProps {
  data: Tipo | null;
  instrumentos: Instrumento[];

}

const formSchema = z.object({
  name: z.string().min(1, { message: "Ingresa el nombre del tipo de instrumento" }),
  instrumentoId: z.string().min(1, { message: "Debes seleccionar un instrumento" }),
})

type TipoFormValues = z.infer<typeof formSchema>

const TipoForm: React.FC<TipoFormProps> = ({
  data,
  instrumentos
}) => {

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();

  const title = data ? "Editar tipo" : "Crear tipo";
  const description = data ? "Edita un tipo" : "Crea un nuevo tipo";
  const toastMessage = data ? "Tipo actualizado" : "Tipo creado";
  const action = data ? "Guardar cambios" : "Crear";

  const form = useForm<TipoFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: data || {
      name: "",
      instrumentoId: "",
    }

  })

  const onSubmit = async (values: TipoFormValues) => {
    try {
      setLoading(true);
      if (!data) {
        await axios.post(`/api/${params.storeId}/tipos`, values);
      } else {
        await axios.patch(`/api/${params.storeId}/tipos/${params.tipoId}`, values);
      }

      router.push(`/${params.storeId}/tipos`);
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
      await axios.delete(`/api/${params.storeId}/tipos/${params.tipoId}`);
      router.push(`/${params.storeId}/tipos`);
      router.refresh();
      toast.success("Tipo eliminado con éxito.");
    } catch (error) {
      toast.error("Primero elimina todos los instrumentos que usan este tipo.");
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
                    <Input disabled={loading} placeholder="nombre del tipo de instrumento..." {...field} />
                  </FormControl>
                  <FormDescription>
                    Nombre del tipo de instrumento. Ej: criolla, acústica, eléctrica.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="instrumentoId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instrumento</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value} defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Selecciona un instrumento"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {instrumentos.map((instrumento) => (
                        <SelectItem
                          key={instrumento.id}
                          value={instrumento.id}
                        >
                          {instrumento.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Instrumento al que pertenece el tipo.
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

export default TipoForm;
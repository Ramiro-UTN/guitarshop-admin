"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Formato, Madera, Producto, Tipo, Image } from "@prisma/client";
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
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import AudioUpload from "@/components/ui/audio-upload";
import ImageUpload from "@/components/ui/image-upload";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import DeleteModal from "@/components/ui/delete-modal";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { instrumentoWithTipos } from "../page";


interface ProductoFormProps {
  data: Producto & {
    images: Image[]
  } | null;
  instrumentos: instrumentoWithTipos[];
  tipos: Tipo[];
  formatos: Formato[];
  maderas: Madera[];
}

const formSchema = z.object({
  name: z.string().min(1, { message: "Ingresa el nombre del producto." }),
  price: z.coerce.number().min(1, { message: "Ingresa un precio." }),
  audioUrl: z.union([z.string().min(4, { message: "Debes seleccionar un archivo de audio." }), z.string().length(0)])
    .optional().transform(e => e === "" ? undefined : e),
  images: z.object({ url: z.string() }).array(),
  instrumentoId: z.string().min(1, { message: "Debes seleccionar un instrumento." }),
  tipoId: z.union([z.string().min(4, { message: "Debes seleccionar un tipo de instrumento." }), z.string().length(0)])
    .optional().transform(e => e === "" ? undefined : e),
  formatoId: z.union([z.string().min(4, { message: "Debes seleccionar un formato." }), z.string().length(0)])
    .optional().transform(e => e === "" ? undefined : e),
  fondo: z.string().min(4, { message: "Ingresa una opción." }),
  tapa: z.string().min(4, { message: "Ingresa una opción." }),
  aros: z.string().min(4, { message: "Ingresa una opción." }),
  mastil: z.string().min(4, { message: "Ingresa una opción." }),
  diapason: z.string().min(4, { message: "Ingresa una opción." }),
  puente: z.string().min(4, { message: "Ingresa una opción." }),
  exhibir: z.boolean().default(false).optional(),
  archivar: z.boolean().default(false).optional(),

})

type ProductoFormValues = z.infer<typeof formSchema>

const ProductoForm: React.FC<ProductoFormProps> = ({
  data,
  instrumentos,
  tipos,
  formatos,
  maderas

}) => {

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedInstrumentId, setSelectedInstrumentId] = useState("");

  const params = useParams();
  const router = useRouter();

  const title = data ? "Editar producto" : "Crear producto";
  const description = data ? "Edita un producto" : "Crea un nuevo producto";
  const toastMessage = data ? "Producto actualizado" : "Producto creado";
  const action = data ? "Guardar cambios" : "Crear";

  const changeHandler = (value: any) => {
    console.log(value);
    setSelectedInstrumentId(value);
    form.resetField('tipoId');
    form.resetField('formatoId');
  }

  // console.log("TIPOS: ", instrumentos[0].tipos);
  const form = useForm<ProductoFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: data ? {
      ...data,
      price: parseFloat(String(data?.price)),
    } : {
      name: "",
      price: 0,
      audioUrl: "",
      images: [],
      instrumentoId: "",
      tipoId: "",
      formatoId: "",
      fondo: "",
      tapa: "",
      aros: "",
      mastil: "",
      diapason: "",
      puente: "",
      exhibir: false,
      archivar: false,
    }

  })

  const onSubmit = async (values: ProductoFormValues) => {
    console.log("PRODUCTO_VALUES: ", values);
    try {
      setLoading(true);
      if (!data) {
        await axios.post(`/api/${params.storeId}/productos`, values);
        console.log("VALUES: ", values);
      } else {
        await axios.patch(`/api/${params.storeId}/productos/${params.productoId}`, values);
      }

      router.push(`/${params.storeId}/productos`);
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
      await axios.delete(`/api/${params.storeId}/productos/${params.productoId}`);
      router.push(`/${params.storeId}/productos`);
      router.refresh();
      toast.success("Producto eliminado con éxito.");
    } catch (error) {
      toast.error("Algo salió mal.");
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
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fotos</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value.map((image) => image.url)}
                    disabled={loading}
                    onChange={(url) => field.onChange([...field.value, { url }])}
                    onRemove={(url) => field.onChange([...field.value.filter((current) => current.url !== url)])}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Nombre del producto..." {...field} />
                  </FormControl>
                  <FormDescription>
                    Nombre del Producto
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" disabled={loading} placeholder="9.99" {...field} />
                  </FormControl>
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
                    onValueChange={(value) => {
                      field.onChange(value)
                      changeHandler(value)
                    }}
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
                      {instrumentos.map((item) => (
                        <SelectItem
                          key={item.id}
                          value={item.id}

                        >
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Selecciona un instrumento
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {selectedInstrumentId && tipos.filter(tipo => tipo.instrumentoId === selectedInstrumentId).length > 0 && (
              <FormField
                control={form.control}
                name="tipoId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo</FormLabel>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value} defaultValue={""}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Selecciona un tipo"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {
                          tipos.filter(tipo => tipo.instrumentoId === selectedInstrumentId)
                            .map((tipo) => (
                              <SelectItem
                                key={tipo.id}
                                value={tipo.id}

                              >
                                {tipo.name}
                              </SelectItem>
                            ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Selecciona un tipo
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {selectedInstrumentId && formatos.filter(item => item.instrumentoId === selectedInstrumentId).length > 0 && (
              <FormField
                control={form.control}
                name="formatoId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Formato</FormLabel>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value} defaultValue={field.value}

                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Selecciona un formato"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {
                          formatos.filter(item => item.instrumentoId === selectedInstrumentId)
                            .map((formato) => (
                              <SelectItem
                                key={formato.id}
                                value={formato.id}

                              >
                                {formato.name}
                              </SelectItem>
                            ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Selecciona un formato
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="fondo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fondo</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value} defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Selecciona una madera"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {maderas.map((item) => (
                        <SelectItem
                          key={item.id}
                          value={item.name}
                        >
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Madera para el fondo
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tapa"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tapa</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value} defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Selecciona una madera"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {maderas.map((item) => (
                        <SelectItem
                          key={item.id}
                          value={item.name}
                        >
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Madera para la tapa
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="aros"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Aros</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value} defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Selecciona una madera"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {maderas.map((item) => (
                        <SelectItem
                          key={item.id}
                          value={item.name}
                        >
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Madera para los aros
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mastil"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mástil</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value} defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Selecciona una madera"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {maderas.map((item) => (
                        <SelectItem
                          key={item.id}
                          value={item.name}
                        >
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Madera para el mástil
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="diapason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Diapasón</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value} defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Selecciona una madera"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {maderas.map((item) => (
                        <SelectItem
                          key={item.id}
                          value={item.name}
                        >
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Madera para el diapasón
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="puente"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Puente</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value} defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Selecciona una madera"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {maderas.map((item) => (
                        <SelectItem
                          key={item.id}
                          value={item.name}
                        >
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Madera para el puente
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="exhibir"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Exhibir
                    </FormLabel>
                    <FormDescription>
                      El producto aparecera en el home.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="archivar"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1">
                    <FormLabel>
                      Archivar
                    </FormLabel>
                    <FormDescription>
                      El producto no aparecerá en el sitio.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>


          <FormField
            control={form.control}
            name="audioUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Archivo de audio</FormLabel>
                <FormControl>
                  <AudioUpload
                    value={field.value ? [field.value] : []}
                    disabled={false}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}

                  />
                </FormControl>
                <FormDescription>
                  Agrega una muestra de audio del instrumento.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={loading}>
            {action}
          </Button>
        </form>
      </Form>

    </>

  );
}

export default ProductoForm;
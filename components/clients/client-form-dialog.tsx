"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { clientSchema, type ClientSchema } from "@/lib/schemas/client";
import { createClient, updateClient } from "@/app/(dashboard)/clients/actions";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  client?: { id: string } & ClientSchema;
}

const empty: ClientSchema = { name: "", address: "", email: "", phone: "" };

export function ClientFormDialog({ open, onOpenChange, client }: Props) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ClientSchema>({
    resolver: zodResolver(clientSchema),
    defaultValues: empty,
  });

  useEffect(() => {
    if (open) {
      reset(client ?? empty);
    }
  }, [open, client, reset]);

  async function onSubmit(values: ClientSchema) {
    try {
      if (client) {
        await updateClient(client.id, values);
      } else {
        await createClient(values);
      }
      toast.success(client ? "Cliente actualizado" : "Cliente creado");
      onOpenChange(false);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error al guardar");
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle>
              {client ? "Editar cliente" : "Nuevo cliente"}
            </DialogTitle>
            <DialogDescription>
              {client
                ? "Actualiza los datos del cliente."
                : "Guarda un cliente para reutilizarlo en tus facturas."}
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <FieldLabel>Nombre</FieldLabel>
              <Input
                {...register("name")}
                autoComplete="off"
                placeholder="Juan Pérez"
              />
              <FieldError errors={[errors.name]} />
            </Field>
            <Field>
              <FieldLabel>Dirección</FieldLabel>
              <Input
                {...register("address")}
                autoComplete="off"
                placeholder="Col. Los Pinos, Bloque 5, Casa 5"
              />
              <FieldError errors={[errors.address]} />
            </Field>
            <Field>
              <FieldLabel>Email</FieldLabel>
              <Input
                {...register("email")}
                type="email"
                autoComplete="off"
                placeholder="cliente@ejemplo.com"
              />
              <FieldError errors={[errors.email]} />
            </Field>
            <Field>
              <FieldLabel>Teléfono</FieldLabel>
              <Input
                {...register("phone")}
                type="tel"
                autoComplete="off"
                placeholder="+504 0000-0000"
              />
              <FieldError errors={[errors.phone]} />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Guardando..." : "Guardar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

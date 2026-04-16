"use client";

import { useFormContext, Controller } from "react-hook-form";
import type { InvoiceSchema } from "@/lib/schemas/invoice";
import { parseLocalDate, toDateInputValue } from "@/lib/utils";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

export function InvoiceDetails() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<InvoiceSchema>();

  return (
    <FieldGroup>
      <Field>
        <FieldLabel>Moneda</FieldLabel>
        <Input
          {...register("invoice.currency")}
          autoComplete="off"
          placeholder="HNL"
        />
        <FieldError errors={[errors.invoice?.currency]} />
      </Field>

      <Field>
        <FieldLabel>Color del tema</FieldLabel>
        <Input
          {...register("invoice.themeColor")}
          type="color"
          autoComplete="off"
        />
        <FieldError errors={[errors.invoice?.themeColor]} />
      </Field>

      <Field>
        <FieldLabel>Prefijo de la factura</FieldLabel>
        <Input
          {...register("invoice.invoicePrefix")}
          autoComplete="off"
          placeholder="FAC-"
        />
        <FieldError errors={[errors.invoice?.invoicePrefix]} />
      </Field>

      <Field>
        <FieldLabel>Número de serie</FieldLabel>
        <Input
          {...register("invoice.serialNumber")}
          autoComplete="off"
          placeholder="0001"
        />
        <FieldError errors={[errors.invoice?.serialNumber]} />
      </Field>

      <Field>
        <FieldLabel>Fecha de la factura</FieldLabel>
        <Controller
          control={control}
          name="invoice.invoiceDate"
          render={({ field }) => (
            <Input
              type="date"
              value={toDateInputValue(field.value)}
              onChange={(e) =>
                field.onChange(parseLocalDate(e.target.value) ?? undefined)
              }
            />
          )}
        />
        <FieldError errors={[errors.invoice?.invoiceDate]} />
      </Field>

      <Field>
        <FieldLabel>Fecha de vencimiento</FieldLabel>
        <Controller
          control={control}
          name="invoice.dueDate"
          render={({ field }) => (
            <Input
              type="date"
              value={toDateInputValue(field.value)}
              onChange={(e) => field.onChange(parseLocalDate(e.target.value))}
            />
          )}
        />
        <FieldError errors={[errors.invoice?.dueDate]} />
      </Field>

      <Field>
        <FieldLabel>Términos de pago</FieldLabel>
        <Input
          {...register("invoice.paymentTerms")}
          autoComplete="off"
          placeholder="Net 30"
        />
        <FieldError errors={[errors.invoice?.paymentTerms]} />
      </Field>
    </FieldGroup>
  );
}

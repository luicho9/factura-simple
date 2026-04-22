"use client";

import { useFormContext, Controller } from "react-hook-form";
import type { InvoiceSchema } from "@/lib/schemas/invoice";
import { currencies } from "@/lib/currencies";
import { DatePicker } from "../ui/date-picker";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

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
        <Controller
          control={control}
          name="invoice.currency"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona moneda" />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((c) => (
                  <SelectItem key={c.code} value={c.code}>
                    {c.code} - {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
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
        <FieldLabel>Número de factura</FieldLabel>
        <Input
          {...register("invoice.invoiceNumber")}
          autoComplete="off"
          placeholder="000-001-01-00000001"
        />
        <FieldError errors={[errors.invoice?.invoiceNumber]} />
      </Field>

      <Field>
        <FieldLabel>Fecha de la factura</FieldLabel>
        <Controller
          control={control}
          name="invoice.invoiceDate"
          render={({ field }) => (
            <DatePicker value={field.value} onChange={field.onChange} />
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
            <DatePicker value={field.value} onChange={field.onChange} />
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

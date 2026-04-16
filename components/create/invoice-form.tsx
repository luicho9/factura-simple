"use client";

import { invoiceSchema, InvoiceSchema } from "@/lib/schemas/invoice";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import type { z } from "zod";

interface InvoiceFormProps {
  children: React.ReactNode;
  defaults: InvoiceSchema;
  fieldsSchema?: z.ZodTypeAny;
}

export function InvoiceForm({
  children,
  defaults,
  fieldsSchema,
}: InvoiceFormProps) {
  const schema = fieldsSchema
    ? invoiceSchema.extend({ presetFields: fieldsSchema })
    : invoiceSchema;
  const form = useForm<InvoiceSchema>({
    resolver: zodResolver(schema),
    defaultValues: defaults,
  });
  return <FormProvider {...form}>{children}</FormProvider>;
}

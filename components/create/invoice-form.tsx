"use client";

import { invoiceSchema, InvoiceSchema } from "@/lib/schemas/invoice";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormProvider,
  useForm,
  type FieldValues,
  type Resolver,
} from "react-hook-form";
import type { z } from "zod";

interface InvoiceFormProps {
  children: React.ReactNode;
  defaults: InvoiceSchema;
  schema?: z.ZodTypeAny;
  fieldsSchema?: z.ZodTypeAny;
}

function getInvoiceFormSchema({
  schema,
  fieldsSchema,
}: Pick<InvoiceFormProps, "schema" | "fieldsSchema">) {
  if (schema) {
    return schema;
  }

  if (fieldsSchema) {
    return invoiceSchema.extend({ presetFields: fieldsSchema });
  }

  return invoiceSchema;
}

export function InvoiceForm({
  children,
  defaults,
  schema,
  fieldsSchema,
}: InvoiceFormProps) {
  const formSchema = getInvoiceFormSchema({ schema, fieldsSchema });

  const resolver = zodResolver(
    formSchema as z.ZodType<unknown, FieldValues>,
  ) as unknown as Resolver<InvoiceSchema>;

  const form = useForm<InvoiceSchema>({
    resolver,
    defaultValues: defaults,
  });
  return <FormProvider {...form}>{children}</FormProvider>;
}

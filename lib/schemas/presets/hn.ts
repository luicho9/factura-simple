import { z } from "zod";
import { type InvoiceSchema, invoiceSchemaDefaultValues } from "../invoice";

export const hnFieldsSchema = z.object({
  rtnEmpresa: z.string().optional(),
  rtnCliente: z.string().optional(),
  cai: z.string().optional(),
  rangoAutorizado: z.string().optional(),
  fechaLimiteEmision: z.date().optional().nullable(),
});

export type HnFields = z.infer<typeof hnFieldsSchema>;

export const hn = {
  label: "Honduras",
  fieldsSchema: hnFieldsSchema,
  invoiceDefaults: {
    ...invoiceSchemaDefaultValues,
    invoice: {
      ...invoiceSchemaDefaultValues.invoice,
      currency: "HNL",
      invoicePrefix: "FAC-",
      billingDetails: [
        { label: "ISV", type: "percentage" as const, value: 15 },
      ],
    },
  } satisfies InvoiceSchema,
};

import { z } from "zod";
import {
  invoiceSchema,
  type InvoiceSchema,
  invoiceSchemaDefaultValues,
} from "../../invoice";

const rtnSchema = z
  .string()
  .regex(/^\d{14}$/, "RTN debe ser exactamente 14 dígitos")
  .optional()
  .or(z.literal(""));

export const hnFieldsSchema = z.object({
  rtnEmpresa: rtnSchema,
  cai: z.string().optional(),
  rangoAutorizado: z.string().optional(),
  fechaLimiteEmision: z.date().optional().nullable(),
});

export type HnFields = z.infer<typeof hnFieldsSchema>;

const hnFieldsDefaults: HnFields = {
  rtnEmpresa: "",
  cai: "",
  rangoAutorizado: "",
  fechaLimiteEmision: null,
};

export const hnInvoiceSchema = invoiceSchema.extend({
  client: invoiceSchema.shape.client.extend({
    taxId: rtnSchema,
  }),
  presetFields: hnFieldsSchema,
});

export const hnInvoiceDefaults: InvoiceSchema = {
  ...invoiceSchemaDefaultValues,
  invoice: {
    ...invoiceSchemaDefaultValues.invoice,
    currency: "HNL",
    invoiceNumber: "000-001-01-00000001",
    billingDetails: [{ label: "ISV", type: "percentage" as const, value: 15 }],
  },
  additionalInfo: {
    ...invoiceSchemaDefaultValues.additionalInfo,
    terms: 'LA FACTURA ES BENEFICIO DE TODOS "EXÍJALA"',
  },
  presetFields: hnFieldsDefaults,
};

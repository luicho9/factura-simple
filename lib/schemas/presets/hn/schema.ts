import { z } from "zod";
import { type InvoiceSchema, invoiceSchemaDefaultValues } from "../../invoice";

export const hnFieldsSchema = z.object({
  rtnEmpresa: z
    .string()
    .regex(/^\d{14}$/, "RTN debe ser exactamente 14 dígitos")
    .optional()
    .or(z.literal("")),
  rtnCliente: z
    .string()
    .regex(/^\d{14}$/, "RTN debe ser exactamente 14 dígitos")
    .optional()
    .or(z.literal("")),
  cai: z.string().optional(),
  rangoAutorizado: z.string().optional(),
  fechaLimiteEmision: z.date().optional().nullable(),
});

export type HnFields = z.infer<typeof hnFieldsSchema>;

export const hnFieldsDefaults: HnFields = {
  rtnEmpresa: "",
  rtnCliente: "",
  cai: "",
  rangoAutorizado: "",
  fechaLimiteEmision: null,
};

export const hnInvoiceDefaults: InvoiceSchema = {
  ...invoiceSchemaDefaultValues,
  invoice: {
    ...invoiceSchemaDefaultValues.invoice,
    currency: "HNL",
    invoicePrefix: "",
    serialNumber: "000-001-01-00000001",
    billingDetails: [{ label: "ISV", type: "percentage" as const, value: 15 }],
  },
  additionalInfo: {
    ...invoiceSchemaDefaultValues.additionalInfo,
    terms: 'LA FACTURA ES BENEFICIO DE TODOS "EXÍJALA"',
  },
  presetFields: hnFieldsDefaults,
};

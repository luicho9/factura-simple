import { z } from "zod";

export const companySchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  address: z.string(),
  email: z.email("Email inválido").or(z.literal("")),
  phone: z.string(),
  logoUrl: z.string().nullable(),
  signatureUrl: z.string().nullable(),
  defaultCurrency: z.string().min(1, "La moneda es requerida"),
  defaultThemeColor: z.string().min(1, "El color es requerido"),
  defaultPreset: z.string().min(1),
  defaultPresetFields: z.record(z.string(), z.unknown()),
  invoicePrefix: z.string(),
  nextSerialNumber: z.number().int().positive(),
  defaultPaymentTerms: z.string(),
  defaultNotes: z.string(),
  defaultTerms: z.string(),
});

export type CompanySchema = z.infer<typeof companySchema>;

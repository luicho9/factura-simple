import type { InvoiceSchema } from "../invoice";
import type { z } from "zod";

export type PresetPreviewSlots = {
  header?: React.ComponentType;
  company?: React.ComponentType;
  client?: React.ComponentType;
  footer?: React.ComponentType;
};

export type Preset = {
  label: string;
  invoiceDefaults: InvoiceSchema;
  fieldsSchema?: z.ZodTypeAny;
  FormFields?: React.ComponentType;
  preview?: PresetPreviewSlots;
};

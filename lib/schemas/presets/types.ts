import type { InvoiceSchema } from "../invoice";
import type { z } from "zod";

export type PresetPreviewSlots = {
  header?: React.ComponentType;
  company?: React.ComponentType;
  client?: React.ComponentType;
  footer?: React.ComponentType;
};

export type PresetPdfSlotProps = { data: unknown; invoice: InvoiceSchema };

export type PresetPdfSlots = {
  header?: React.ComponentType<PresetPdfSlotProps>;
  company?: React.ComponentType<PresetPdfSlotProps>;
  client?: React.ComponentType<PresetPdfSlotProps>;
  footer?: React.ComponentType<PresetPdfSlotProps>;
};

export type PresetFormFieldsProps = {
  pathPrefix?: string;
};

export type Preset = {
  label: string;
  invoiceDefaults: InvoiceSchema;
  invoiceSchema?: z.ZodTypeAny;
  fieldsSchema?: z.ZodTypeAny;
  FormFields?: React.ComponentType<PresetFormFieldsProps>;
  clientTaxIdLabel?: string;
  getCompanyPresetFields?: (
    fields: Record<string, unknown>,
  ) => Record<string, unknown>;
  preview?: PresetPreviewSlots;
  pdf?: PresetPdfSlots;
};

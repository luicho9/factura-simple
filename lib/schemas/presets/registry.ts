import { invoiceSchemaDefaultValues } from "../invoice";
import { hn } from "./hn";

export const presets = {
  default: {
    label: "Predeterminado",
    fieldsSchema: null,
    invoiceDefaults: invoiceSchemaDefaultValues,
  },
  HN: hn,
};

export type PresetKey = keyof typeof presets;

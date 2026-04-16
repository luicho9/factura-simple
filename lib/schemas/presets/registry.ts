import { invoiceSchemaDefaultValues } from "../invoice";
import { hn } from "./hn";
import type { Preset } from "./types";

export const presets: Record<string, Preset> = {
  default: {
    label: "Predeterminado",
    invoiceDefaults: invoiceSchemaDefaultValues,
  },
  HN: hn,
};

export type PresetKey = keyof typeof presets;

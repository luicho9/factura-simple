import type { Preset } from "../types";
import { hnFieldsSchema, hnInvoiceDefaults, hnInvoiceSchema } from "./schema";
import { HnFormFields } from "./form-fields";
import { HnHeaderPreview } from "./preview/header";
import { HnCompanyPreview } from "./preview/company";
import { HnClientPreview } from "./preview/client";
import { HnPdfHeader } from "./pdf/header";
import { HnPdfCompany } from "./pdf/company";
import { HnPdfClient } from "./pdf/client";
import { getHnCompanyPresetFields } from "./fields";

export const hn: Preset = {
  label: "Honduras",
  invoiceSchema: hnInvoiceSchema,
  fieldsSchema: hnFieldsSchema,
  invoiceDefaults: hnInvoiceDefaults,
  FormFields: HnFormFields,
  clientTaxIdLabel: "RTN del cliente",
  getCompanyPresetFields: getHnCompanyPresetFields,
  preview: {
    header: HnHeaderPreview,
    company: HnCompanyPreview,
    client: HnClientPreview,
  },
  pdf: {
    header: HnPdfHeader,
    company: HnPdfCompany,
    client: HnPdfClient,
  },
};

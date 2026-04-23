import { describe, expect, test } from "vitest";
import type { Client, Company } from "@/lib/db/schema";
import type { Preset } from "@/lib/schemas/presets/types";
import {
  hnInvoiceDefaults,
  hnInvoiceSchema,
} from "@/lib/schemas/presets/hn/schema";
import { getHnCompanyPresetFields } from "@/lib/schemas/presets/hn/fields";
import { mergeDefaults } from "./defaults";

const now = new Date("2026-04-22T00:00:00.000Z");

function makeCompany(overrides: Partial<Company> = {}): Company {
  return {
    userId: "user-1",
    name: "Factura Simple S. de R.L.",
    address: "San Pedro Sula",
    email: "",
    phone: "",
    metadata: [],
    logoUrl: null,
    signatureUrl: null,
    defaultCurrency: "HNL",
    defaultThemeColor: "#00786f",
    defaultPreset: "HN",
    defaultPresetFields: {},
    invoicePrefix: "",
    defaultPaymentTerms: "",
    defaultNotes: "",
    defaultTerms: "",
    defaultPaymentInformation: [],
    createdAt: now,
    updatedAt: now,
    ...overrides,
  };
}

function makeClient(overrides: Partial<Client> = {}): Client {
  return {
    id: "00000000-0000-0000-0000-000000000001",
    userId: "user-1",
    name: "Agencia Rivera Fiallos S. de R.L.",
    address: "San Pedro Sula",
    email: "",
    phone: "",
    taxId: "05019025225551",
    metadata: [],
    createdAt: now,
    updatedAt: now,
    ...overrides,
  };
}

const hnPreset = {
  label: "Honduras",
  invoiceDefaults: hnInvoiceDefaults,
  getCompanyPresetFields: getHnCompanyPresetFields,
} satisfies Preset;

describe("mergeDefaults", () => {
  test("uses the selected client's tax ID in client defaults", () => {
    const result = mergeDefaults(
      hnPreset,
      makeCompany({
        defaultPresetFields: {
          rtnEmpresa: "08019999999999",
        },
      }),
      makeClient(),
      "HN",
    );

    expect(result.client.taxId).toBe("05019025225551");
    expect(result.presetFields).toMatchObject({
      rtnEmpresa: "08019999999999",
    });
  });

  test("does not carry client RTN in Honduras preset fields", () => {
    const result = mergeDefaults(
      hnPreset,
      makeCompany({
        defaultPresetFields: {
          rtnEmpresa: "08019999999999",
          rtnCliente: "00000000000000",
        },
      }),
      null,
      "HN",
    );

    expect(result.presetFields).toMatchObject({
      rtnEmpresa: "08019999999999",
    });
    expect(result.presetFields).not.toHaveProperty("rtnCliente");
  });

  test("validates Honduras client tax ID as RTN", () => {
    const result = hnInvoiceSchema.safeParse({
      ...hnInvoiceDefaults,
      client: {
        ...hnInvoiceDefaults.client,
        taxId: "123",
      },
    });

    expect(result.success).toBe(false);
  });
});

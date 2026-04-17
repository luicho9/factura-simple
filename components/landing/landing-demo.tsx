"use client";

import { InvoiceForm } from "@/components/create/invoice-form";
import { InvoicePreview } from "@/components/create/invoice-preview";
import { BrowserChrome } from "@/components/landing/browser-chrome";
import type { InvoiceSchema } from "@/lib/schemas/invoice";

const demoInvoice: InvoiceSchema = {
  company: {
    name: "Estudio Luna",
    address: "Col. Palmira, Av. Juan Pablo II\nTegucigalpa, Honduras",
    email: "hola@estudioluna.com",
    phone: "+504 9999-1234",
    metadata: [],
  },
  client: {
    name: "María Alvarado",
    address: "Res. El Trapiche, Bloque 3\nTegucigalpa, Honduras",
    email: "maria@alvarado.com",
    phone: "",
    metadata: [],
  },
  invoice: {
    currency: "HNL",
    themeColor: "#00786f",
    invoicePrefix: "FS-",
    serialNumber: "0042",
    invoiceDate: new Date("2026-04-12"),
    dueDate: new Date("2026-04-26"),
    paymentTerms: "Neto 15",
    billingDetails: [{ label: "ISV", type: "percentage", value: 15 }],
  },
  items: [
    {
      name: "Diseño de identidad visual",
      description: "Logotipo, paleta y tipografía",
      quantity: 1,
      unitPrice: 18000,
    },
    {
      name: "Sesión fotográfica",
      description: "Producto y ambiente",
      quantity: 2,
      unitPrice: 4500,
    },
    {
      name: "Manual de marca",
      description: "",
      quantity: 1,
      unitPrice: 6000,
    },
  ],
  additionalInfo: {
    notes: "",
    terms: "",
    paymentInformation: [],
  },
  presetFields: {},
};

export function LandingDemo() {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="overflow-hidden rounded-lg border bg-card shadow-2xl">
        <BrowserChrome url="facturasimple.app/create" />
        <div
          className="pointer-events-none h-[460px] overflow-hidden bg-muted p-3 select-none sm:h-[520px] sm:p-6 [mask-image:linear-gradient(to_bottom,black_70%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,black_70%,transparent)] [&_*::-webkit-scrollbar]:hidden [&_*]:[scrollbar-width:none]"
        >
          <InvoiceForm defaults={demoInvoice}>
            <InvoicePreview />
          </InvoiceForm>
        </div>
      </div>
    </div>
  );
}

import type { InvoiceSchema } from "@/lib/schemas/invoice";

export function generateInvoiceName(data: InvoiceSchema, extension: "pdf") {
  const safe = data.invoice.invoiceNumber
    .replace(/[^\w-]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `factura-${safe || "sin-numero"}.${extension}`;
}

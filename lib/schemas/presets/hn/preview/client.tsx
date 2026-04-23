"use client";

import { useFormContext } from "react-hook-form";
import type { InvoiceSchema } from "@/lib/schemas/invoice";

export function HnClientPreview() {
  const { watch } = useFormContext<InvoiceSchema>();
  const rtn = watch("client.taxId");
  if (!rtn) {
    return null;
  }
  return (
    <ul className="text-muted-foreground mt-1 space-y-0.5">
      <li>
        <span className="font-medium">RTN:</span> {rtn}
      </li>
    </ul>
  );
}

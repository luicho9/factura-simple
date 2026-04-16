"use client";

import { useFormContext } from "react-hook-form";
import type { HnFields } from "../schema";

export function HnCompanyPreview() {
  const { watch } = useFormContext<{ presetFields: HnFields }>();
  const rtn = watch("presetFields.rtnEmpresa");
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

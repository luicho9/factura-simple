"use client";

import { useFormContext } from "react-hook-form";
import type { HnFields } from "../schema";

const formatDate = (date: Date | null | undefined) => {
  if (!date) {
    return "";
  }
  const d = date instanceof Date ? date : new Date(date);
  if (Number.isNaN(d.getTime())) {
    return "";
  }
  return new Intl.DateTimeFormat("es-HN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
};

export function HnHeaderPreview() {
  const { watch } = useFormContext<{ presetFields: HnFields }>();
  const fields = watch("presetFields");

  return (
    <>
      {fields?.cai && (
        <>
          <dt className="font-semibold">CAI</dt>
          <dd>{fields.cai}</dd>
        </>
      )}
      {fields?.rangoAutorizado && (
        <>
          <dt className="font-semibold">Rango autorizado</dt>
          <dd>{fields.rangoAutorizado}</dd>
        </>
      )}
      {fields?.fechaLimiteEmision && (
        <>
          <dt className="font-semibold">Fecha límite de emisión</dt>
          <dd>{formatDate(fields.fechaLimiteEmision)}</dd>
        </>
      )}
    </>
  );
}

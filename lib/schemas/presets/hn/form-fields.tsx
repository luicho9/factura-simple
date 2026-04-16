"use client";

import { Controller, useFormContext } from "react-hook-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { parseLocalDate, toDateInputValue } from "@/lib/utils";
import type { HnFields } from "./schema";

type HnForm = { presetFields: HnFields };

export function HnFormFields() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<HnForm>();
  const presetErrors = errors.presetFields;

  return (
    <FieldGroup>
      <Field>
        <FieldLabel>RTN de la empresa</FieldLabel>
        <Input
          {...register("presetFields.rtnEmpresa")}
          autoComplete="off"
          placeholder="00000000000000"
          maxLength={14}
        />
        <FieldError errors={[presetErrors?.rtnEmpresa]} />
      </Field>

      <Field>
        <FieldLabel>RTN del cliente</FieldLabel>
        <Input
          {...register("presetFields.rtnCliente")}
          autoComplete="off"
          placeholder="00000000000000"
          maxLength={14}
        />
        <FieldError errors={[presetErrors?.rtnCliente]} />
      </Field>

      <Field>
        <FieldLabel>CAI</FieldLabel>
        <Input
          {...register("presetFields.cai")}
          autoComplete="off"
          placeholder="XXXXXX-XXXXXX-XXXXXX-XXXXXX-XXXXXX-XX"
        />
        <FieldError errors={[presetErrors?.cai]} />
      </Field>

      <Field>
        <FieldLabel>Rango autorizado</FieldLabel>
        <Input
          {...register("presetFields.rangoAutorizado")}
          autoComplete="off"
          placeholder="000-001-01-00000001 al 000-001-01-00000500"
        />
        <FieldError errors={[presetErrors?.rangoAutorizado]} />
      </Field>

      <Field>
        <FieldLabel>Fecha límite de emisión</FieldLabel>
        <Controller
          control={control}
          name="presetFields.fechaLimiteEmision"
          render={({ field }) => (
            <Input
              type="date"
              value={toDateInputValue(field.value)}
              onChange={(e) => field.onChange(parseLocalDate(e.target.value))}
            />
          )}
        />
        <FieldError errors={[presetErrors?.fechaLimiteEmision]} />
      </Field>
    </FieldGroup>
  );
}

import { z } from "zod";

export const clientSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  address: z.string(),
  email: z.email("Email inválido").or(z.literal("")),
  phone: z.string(),
});

export type ClientSchema = z.infer<typeof clientSchema>;

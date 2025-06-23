import { z } from "zod";

export const Uvalidate = z.object({
  ci: z
    .string()
    .min(6, "La CI boliviana debe tener al menos 6 dígitos")
    .max(10, "La CI boliviana no puede tener más de 10 dígitos")
    .regex(/^\d+$/, "La CI solo debe contener números")
    .refine((ci) => {
      return !/^(\d)\1+$/.test(ci);
    }, "La CI no puede ser una secuencia de números repetidos"),
});
export const UvalidateR = z.object({
  empleado: z.string(),
  ci: z.string(),
  item: z.string(),
  unidad: z.string(),
  cargo: z.string(),
  institucion: z.string(),
  id_tipocontrato: z.string(),
  tipocontrato: z.string(),
  nombre: z.string(),
  otro_nombre: z.string(),
  paterno: z.string(),
  materno: z.string(),
});

export type DTO_uValidate = z.infer<typeof Uvalidate>;
export type DTO_uValidateR = z.infer<typeof UvalidateR>;

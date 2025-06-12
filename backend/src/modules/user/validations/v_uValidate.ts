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

export type DTO_uValidate = z.infer<typeof Uvalidate>;

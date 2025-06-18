import { U_estado } from "@prisma/client";
import { z } from "zod";

export const CreateUnidadSchema = z.object({
  ue: z.string(),
  secretaria: z.string(),
  descripcion: z.string(),
  estado: z.nativeEnum(U_estado),
});
export type DTO_uniCreate = z.infer<typeof CreateUnidadSchema>;

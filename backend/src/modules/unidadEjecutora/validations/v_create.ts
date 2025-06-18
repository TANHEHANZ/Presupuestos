import { z } from "zod";

export const CreateUnidadSchema = z.object({
  codigo: z.string(),
  sigla: z.string(),
  nombre: z.string(),
  descripcion: z.string(),
});
export type DTO_uniCreate = z.infer<typeof CreateUnidadSchema>;

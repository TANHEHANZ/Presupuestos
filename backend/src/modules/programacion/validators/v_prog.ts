import { z } from "zod";

const SchemaProgramacion = z.object({
  mes: z.string(),
  value: z.number(),
});

export const ParamsSchema = z.object({
  idPresupuesto: z.string(),
  programacion: z.array(SchemaProgramacion),
});

export type DTO_paramsProgramation = z.infer<typeof ParamsSchema>;

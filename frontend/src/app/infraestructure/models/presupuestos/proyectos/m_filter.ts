import { z } from 'zod';
export const FilterProyectos = z.object({
  descripcion: z.string().optional(),
  org: z.string().optional(),
  objeto: z.string().optional(),
  descripcionGasto: z.string().optional(),
});
export type DTO_FilterProyecto = z.infer<typeof FilterProyectos>;

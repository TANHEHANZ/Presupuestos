import { z } from 'zod';
export const M_filtersPresupuesto = z.object({
  ue: z.string().optional(),
  Municipal: z.string().optional(),
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number(),
});

export type DTO_FilterPresupuestoUnidad = z.infer<typeof M_filtersPresupuesto>;

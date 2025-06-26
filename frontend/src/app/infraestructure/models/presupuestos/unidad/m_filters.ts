import { z } from 'zod';
export const M_filtersPresupuesto = z.array(
  z.object({
    ue: z.string(),
    Municipal: z.string(),
  })
);

export type DTO_FilterPresupuestoUnidad = z.infer<typeof M_filtersPresupuesto>;

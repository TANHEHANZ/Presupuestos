import { z } from 'zod';
export const M_presupuestoUnidadesR = z.array(
  z.object({
    ue: z.string(),
    descripcion: z.string(),
    montoVigente: z.number(),
    montoDevengado: z.number(),
  })
);

export type DTO_presupuestoUnidadesR = z.infer<typeof M_presupuestoUnidadesR>;

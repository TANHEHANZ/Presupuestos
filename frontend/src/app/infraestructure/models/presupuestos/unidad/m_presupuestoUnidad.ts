import { z } from 'zod';
export const M_presupuestoUnidadesR = z.array(
  z.object({
    ue: z.string(),
    descripcion: z.string(),
    montoVigente: z.number(),
    montoProgramado: z.string(),
  })
);

export type DTO_presupuestoUnidadesR = z.infer<typeof M_presupuestoUnidadesR>;

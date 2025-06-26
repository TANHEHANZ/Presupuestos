import { z } from 'zod';
export const M_proyectosR = z.array(
  z.object({
    id: z.string(),
    mes: z.string(),
    ue: z.number(),
    org: z.number(),
    objetoGasto: z.string(),
    descripcionGasto: z.string(),
    presupuestoVigente: z.number(),
    devengado: z.number(),
    porcentajeEjecucion: z.number(),
    unidad: z.string(),
  })
);

export type DTO_proyectosR = z.infer<typeof M_proyectosR>;

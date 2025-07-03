import { z } from 'zod';

const items = z.array(
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

export const M_proyectosR = z.object({
  items,
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number(),
});

export type DTO_proyectosR = z.infer<typeof M_proyectosR>;
export type DTO_proyectosRItems = z.infer<typeof items>;

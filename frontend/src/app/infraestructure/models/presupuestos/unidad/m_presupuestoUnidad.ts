import { z } from 'zod';
const items = z.array(
  z.object({
    ue: z.string(),
    descripcion: z.string(),
    montoVigente: z.number(),
    montoProgramado: z.number(),
  })
);
export const M_presupuestoUnidadesR = z.object({
  items,
  limit: z.number(),
  page: z.number(),
  total: z.number(),
  totalPages: z.number(),
});

export type DTO_presupuestoUnidadesR = z.infer<typeof M_presupuestoUnidadesR>;
export type DTO_presupuestoUnidadesItem = z.infer<typeof items>;

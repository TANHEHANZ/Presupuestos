import { z } from 'zod';
export const M_uniAll = z.array(
  z.object({
    id: z.string(),
    ue: z.string(),
    secretaria: z.string(),
    descripcion: z.string(),
    estado: z.string(),
  })
);

export const M_uniAllPaginated = z.object({
  items: M_uniAll,
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number(),
});

export const M_filterUnidad = z.object({
  ue: z.string().optional(),
  secretaria: z.string().optional(),
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number(),
});

export type DTO_FilterUnidad = z.infer<typeof M_filterUnidad>;

export type DTO_UnidadesR = z.infer<typeof M_uniAll>;
export type DTO_UnidadesRItems = z.infer<typeof M_uniAll>;

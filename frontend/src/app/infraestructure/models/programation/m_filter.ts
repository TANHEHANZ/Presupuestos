import { z } from 'zod';
export const FilterProgramation = z.object({
  descripcion: z.string().optional(),
  org: z.string().optional(),
  objeto: z.string().optional(),
  descripcionGasto: z.string().optional(),
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number(),
});
export type DTO_Filter = z.infer<typeof FilterProgramation>;

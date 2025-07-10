import { z } from 'zod';

export const M_unidadDeleted = z.object({
  id: z.string(),
});
export type DTO_UnidadDeleted = z.infer<typeof M_unidadDeleted>;

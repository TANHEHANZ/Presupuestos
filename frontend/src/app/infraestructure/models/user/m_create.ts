import { z } from 'zod';

export const M_uCreate = z.object({
  ci: z.string().optional(),
  name: z.string().optional(),
  rol: z.string(),
  estado: z.string(),
  permisos: z.array(z.string()),
  unidadId: z.string(),
});
export type DTO_UserCreate = z.infer<typeof M_uCreate>;

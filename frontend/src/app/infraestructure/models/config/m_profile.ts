import { z } from 'zod';

export const M_uProfile = z.object({
  ci: z.string(),
  name: z.string(),
  rol: z.string(),
  estado: z.string(),
  unidadEjecutora: z.object({
    secretaria: z.string(),
    descripcion: z.string(),
  }),
});
export type DTO_Profile = z.infer<typeof M_uProfile>;

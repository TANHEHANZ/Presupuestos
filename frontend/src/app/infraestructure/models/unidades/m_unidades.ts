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

export type DTO_UnidadesR = z.infer<typeof M_uniAll>;

import { z } from 'zod';

export const UpdateUnidadSchema = z.object({
  ue: z.string(),
  secretaria: z.string(),
  descripcion: z.string(),
  estado: z.enum(['ACTIVO', 'INACTIVO']),
  id: z.string(),
});
export type DTO_UpdateUnidad = z.infer<typeof UpdateUnidadSchema>;

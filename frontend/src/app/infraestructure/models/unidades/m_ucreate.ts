import { z } from 'zod';

export const CreateUnidadSchema = z.object({
  ue: z.string(),
  secretaria: z.string(),
  descripcion: z.string(),
  estado: z.enum(['ACTIVO', 'INACTIVO']),
});
export type DTO_CreateUnidad = z.infer<typeof CreateUnidadSchema>;

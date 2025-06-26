import { z } from 'zod';
export const M_presupuestoUniUploadR = z.object({
  savedCount: z.number(),
});

export const M_presupuestoUniUpload = z.object({
  file: z.any(),
});
export type DTO_presupuestoUniUploadR = z.infer<typeof M_presupuestoUniUploadR>;
export type DTO_presupuestoUniUpload = z.infer<typeof M_presupuestoUniUpload>;

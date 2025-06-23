import { z } from 'zod';

export const M_uDeleted = z.object({
  id: z.string().optional(),
});
export type DTO_UserDeleted = z.infer<typeof M_uDeleted>;

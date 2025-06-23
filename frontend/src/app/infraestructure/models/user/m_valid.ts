import { z } from 'zod';
export const M_uValid = z
  .object({
    ci: z.string(),
  })
  .strict();

export const M_uValidR = z.object({
  ci: z.string().optional(),
  name: z.string().optional(),
});
export type DTO_UserValid = z.infer<typeof M_uValid>;
export type DTO_UserValidR = z.infer<typeof M_uValidR>;

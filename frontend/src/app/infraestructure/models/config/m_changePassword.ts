import { z } from 'zod';

export const changePasswordParams = z
  .object({
    password: z.string(),
    confirmChange: z.boolean(),
    newPassword: z.string(),
  })
  .strict();
export type DTO_uChangePassword = z.infer<typeof changePasswordParams>;

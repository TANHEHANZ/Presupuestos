import { z } from 'zod';
export const LoginChema = z
  .object({
    ci: z.string(),
    password: z.string(),
  })
  .strict();

export const LoginResponse = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

export type DTO_lnLogin = z.infer<typeof LoginChema>;
export type DTO_lnResponse = z.infer<typeof LoginResponse>;

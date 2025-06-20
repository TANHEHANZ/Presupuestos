import { z } from "zod";
export const Credentials = z
  .object({
    ci: z.string(),
    password: z.string(),
  })
  .strict();
export type DTO_lnCredentials = z.infer<typeof Credentials>;

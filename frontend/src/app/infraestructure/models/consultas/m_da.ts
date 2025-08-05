import { z } from 'zod';

export const DAFilterResponse = z.array(
  z.object({
    value: z.number(),
  })
);

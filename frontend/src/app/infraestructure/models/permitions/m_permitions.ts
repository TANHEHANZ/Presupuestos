import { z } from 'zod';

export const PermitionSchema = z.object({
  name: z.string(),
  key: z.string(),
  icon: z.any().optional(),
});

export const PermitionGroupSchema = z.object({
  group: z.string(),
  color: z.string(),
  icon: z.any().optional(),
  permissions: z.array(PermitionSchema),
});

export const PermitionsR = z.array(PermitionGroupSchema);

export type DTO_pPermitionsR = z.infer<typeof PermitionsR>;

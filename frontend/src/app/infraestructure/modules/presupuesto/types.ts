import z from 'zod';

export const PermitionSchema = z.object({
  name: z.string(),
  key: z.string(),
  icon: z.any(),
});

export const PermitionGroupSchema = z.object({
  group: z.string(),
  color: z.string(),
  icon: z.any(),
  permissions: z.array(PermitionSchema),
});

export const R_User = z.object({
  ci: z.string(),
  name: z.string(),
  email: z.string(),
  rol: z.string(),
  estado: z.string(),
  createdAt: z.string(),
  permisos: z.array(PermitionGroupSchema),
});

export type R_UserDTO = z.infer<typeof R_User>;

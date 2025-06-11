import z from 'zod';

const C_Permisos = z.object({
  id: z.string(),
  nombre: z.string(),
});

export const R_User = z.object({
  ci: z.string(),
  name: z.string(),
  email: z.string(),
  rol: z.string(),
  estado: z.string(),
  createdAt: z.string(),
  permisos: z.array(C_Permisos),
});

export type R_UserDTO = z.infer<typeof R_User>;

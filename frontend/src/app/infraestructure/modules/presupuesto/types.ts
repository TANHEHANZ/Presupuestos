import z from 'zod';
import { ICONS } from '../../../precentation/shared/icons/name';
export type IconName = keyof typeof ICONS;
export const IconNameEnum = z.enum(
  Object.keys(ICONS) as [IconName, ...IconName[]]
);
export const PermitionSchema = z.object({
  name: z.string(),
  key: z.string(),
  icon: IconNameEnum,
});

export const PermitionGroupSchema = z.object({
  group: z.string(),
  color: z.string(),
  icon: IconNameEnum,
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

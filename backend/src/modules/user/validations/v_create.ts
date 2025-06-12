import { Role, U_estado } from "@prisma/client";
import z from "zod";

const U_permisos = z.object({
  nombre: z.string(),
});

export const CreateUserSchema = z.object({
  ci: z.string(),
  name: z.string(),
  email: z.string(),
  rol: z.nativeEnum(Role),
  estado: z.nativeEnum(U_estado),
  permisos: z.array(U_permisos),
  unidadId: z.string(),
});
export type DTO_uCreate = z.infer<typeof CreateUserSchema>;

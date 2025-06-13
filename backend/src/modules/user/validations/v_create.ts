import { prismaC } from "@/infraestructure/config/prisma.client";
import { Role, U_estado } from "@prisma/client";
import { z } from "zod";

export const CreateUserSchema = z.object({
  ci: z
    .string()
    .min(6, "La CI debe tener al menos 6 dígitos")
    .max(10, "La CI no puede tener más de 10 dígitos")
    .regex(/^\d+$/, "La CI solo debe contener números"),
  name: z
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(100, "El nombre no puede exceder 100 caracteres"),
  rol: z.nativeEnum(Role),
  estado: z.nativeEnum(U_estado),
  permisos: z
    .array(z.string().min(1, "Cada permiso debe ser un string no vacío"))
    .nonempty("Debe especificar al menos un permiso"),
  unidadId: z
    .string()
    .uuid("Debe ser un UUID válido")
    .refine(
      async (id) => {
        const unidad = await prismaC.unidadEjecutora.findUnique({
          where: { id },
        });
        return !!unidad;
      },
      { message: "La unidad que seleccionaste no existe" }
    ),
});

export type DTO_uCreate = z.infer<typeof CreateUserSchema>;

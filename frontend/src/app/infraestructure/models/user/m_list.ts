import { z } from 'zod';

export const M_uList = z.array(
  z.object({
    id: z.string(),
    ci: z.string(),
    name: z.string(),
    rol: z.string(),
    estado: z.string(),
    unidadEjecutora: z.object({
      id: z.string(),
      ue: z.string(),
      secretaria: z.string(),
      descripcion: z.string(),
      estado: z.string(),
      createdAt: z.string().datetime(),
      updatedAt: z.string().datetime(),
    }),
    permisos: z.array(
      z.object({
        group: z.string(),
        color: z.string(),
        icon: z.string(),
        permissions: z.array(
          z.object({
            name: z.string(),
            key: z.string(),
            icon: z.string(),
          })
        ),
      })
    ),
  })
);
export type DTO_uList = z.infer<typeof M_uList>;

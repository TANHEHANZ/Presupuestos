import { string, z } from 'zod';
// "id": "cmcdr0q240005uob0v73lddnt",
//                 "catPrg": " 001 0  001",
//                 "descripcion": "Concejo Municipal",
//                 "fte": 20,
//                 "mes": "2025-06-26T19:00:41.559Z",
//                 "org": 210,
//                 "objetoGasto": "1.1.6",
//                 "descripcionGasto": "Asignaciones Familiares",
//                 "presupuestoVigente": 170000
const items = z.array(
  z.object({
    id: z.string(),
    catPrg: z.string(),
    descripcion: z.string(),
    fte: z.number(),
    mes: z.string(),
    org: z.number(),
    objetoGasto: z.string(),
    descripcionGasto: z.string(),
    presupuestoVigente: z.number(),
  })
);

export const M_proyectosR = z.object({
  items,
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number(),
});

export type DTO_proyectosR = z.infer<typeof M_proyectosR>;
export type DTO_proyectosRItems = z.infer<typeof items>;

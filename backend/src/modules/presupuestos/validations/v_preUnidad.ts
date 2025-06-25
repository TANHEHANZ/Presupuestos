import { EstadoRegistro } from "@prisma/client";
import { z } from "zod";

export const preUnidadSchema = z.object({
  mes: z.date(),
  da: z.number(),
  ue: z.number(),
  catPrg: z.string(),
  fte: z.number(),
  org: z.number(),
  objetoGasto: z.string(),
  codigoObjetoGasto: z.string(),
  presupuestoVigente: z.number(),
  devengado: z.number(),
  porcentajeEjecucion: z.number(),
  descrpcionObjetoGasto: z.string(),
  estado: z.nativeEnum(EstadoRegistro),
  unidadId: z.string(),
  creadoPorId: z.string(),
});

export type DTO_preUnidadSave = z.infer<typeof preUnidadSchema>;

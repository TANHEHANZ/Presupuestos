import { z } from 'zod';

export const unidadEjecutoraSchema = z.object({
  ue: z.string(),
  secretaria: z.string(),
  descripcion: z.string(),
});

export const itemSchema = z.object({
  mes: z.string(),
  da: z.number(),
  ue: z.number(),
  catPrg: z.string(),
  fte: z.number(),
  org: z.number(),
  objetoGasto: z.string(),
  presupuestoVigente: z.number(),
  devengado: z.number(),
  descrpcionObjetoGasto: z.string(),
  unidadEjecutora: unidadEjecutoraSchema,
  totalProgramacion: z.number(),
});

export const dataSchema = z.object({
  items: z.array(itemSchema),
  total: z.number(),
  page: z.number(),
  limit: z.union([z.number(), z.string()]),
  totalPages: z.number(),
});

export type DTO_consultasR = z.infer<typeof dataSchema>;
export type DTO_consultasRItems = z.infer<typeof itemSchema>;

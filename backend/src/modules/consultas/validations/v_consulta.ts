import { z } from "zod";

export const consultaSchema = z.object({
  page: z.number(),
  limit: z.number(),
  tipoGasto: z.enum(["ELEGIBLES", "FUNCIONAMIENTO"]).optional(),
  da: z.number().optional(),
  fte: z.number().optional(),
  catProgDesde: z.string().optional(),
  catProgHasta: z.string().optional(),
  ueDesde: z.number().optional(),
  ueHasta: z.number().optional(),
  orgDesde: z.number().optional(),
  orgHasta: z.number().optional(),
  descripcion: z.string().optional(),
  objetoGasto: z.string().optional(),
  descripcionGasto: z.string().optional(),
  operador: z.enum(["IGUAL", "MAYOR_QUE", "MENOR_QUE"]).optional(),
  presupuestoVigenteComparar: z.number().optional(),
  periodo: z.any().optional(),
});

export type DTO_consultaParams = z.infer<typeof consultaSchema>;

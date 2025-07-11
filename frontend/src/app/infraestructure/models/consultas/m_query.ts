import { z } from 'zod';

export const consultaQuery = z.object({
  page: z.number().optional(),
  limit: z.number().optional(),
  tipoGasto: z.enum(['ELEGIBLES', 'FUNCIONAMIENTO']).optional(),
  da: z.number().optional(),
  fte: z.number().optional(),
  catProg: z.string().optional(),
  ueDesde: z.number().optional(),
  ueHasta: z.number().optional(),
  orgDesde: z.number().optional(),
  orgHasta: z.number().optional(),
  descripcion: z.string().optional(),
  objetoGasto: z.string().optional(),
  descripcionGasto: z.string().optional(),
  operador: z.enum(['IGUAL', 'MAYOR_QUE', 'MENOR_QUE']).optional(),
  presupuestoVigenteComparar: z.number().optional(),
  periodo: z
    .tuple([
      z
        .string()
        .refine((d) => !isNaN(Date.parse(d)), { message: 'Fecha inválida' }),
      z
        .string()
        .refine((d) => !isNaN(Date.parse(d)), { message: 'Fecha inválida' }),
    ])
    .optional(),
});

export type DTO_consultaQuery = z.infer<typeof consultaQuery>;

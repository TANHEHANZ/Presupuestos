import { z } from 'zod';

const UnidadEjecutoraSchema = z.object({
  id: z.string(),
  ue: z.string(),
  secretaria: z.string(),
  descripcion: z.string(),
});

const PresupuestoSchema = z.object({
  id: z.string(),
  codigoObjetoGasto: z.string(),
  descripcion: z.string(),
  mes: z.string(),
  fte: z.number(),
  CatPrg: z.string(),
  org: z.number(),
  objetoGasto: z.string(),
  descripcionGasto: z.string(),
  presupuestoVigente: z.number(),
  presupuestoProgramado: z.number(),
  lastMonth: z.string(),
  currentMonth: z.string(),
  unidadEjecutora: UnidadEjecutoraSchema,
});

const ProgramacionSchema = z.object({
  id: z.string().nullable(),
  mes: z.enum([
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ]),
  value: z.number(),
  version: z.number(),
  updatedAt: z.string().nullable(),
  codigoObjetoGasto: z.string(),
  estado: z.enum(['ACTIVO', 'INACTIVO']),
});
const items = z.array(
  z.object({
    presupuesto: PresupuestoSchema,
    programacion: z
      .array(ProgramacionSchema)
      .refine((arr) => arr.length === 12, {
        message: 'La programación debe tener los 12 meses',
      }),
  })
);
export const M_programation = z.object({
  items,
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number(),
});

export type DTO_ProgramationR = z.infer<typeof M_programation>;
export type DTO_ProgramationRData = z.infer<typeof items>;

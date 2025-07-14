import { z } from "zod";
const meses = z.object({
  mes: z.string(),
  value: z.string(),
});

const response = z.object({
  meses: z.array(meses),
  mesActual: z.string(),
  asigado: z.boolean(),
  TotalAsignado: z.number(),
});

export type DTO_Pre_CalendarRespoonse = z.infer<typeof response>;

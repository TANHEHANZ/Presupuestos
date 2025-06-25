import { z } from "zod";

export const filePreUnidad = z.object({
  originalname: z.string().nonempty("El archivo debe tener un nombre"),
  mimetype: z.enum(
    [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ],
    {
      errorMap: () => ({
        message: "El tipo de archivo no es válido (solo Excel)",
      }),
    }
  ),
  size: z
    .number()
    .max(10 * 1024 * 1024, "El archivo excede el tamaño permitido (10MB)"),
  buffer: z.instanceof(Buffer, {
    message: "El contenido del archivo es inválido",
  }),
});

export const contentXlsxPreUnidad = z.object({
  DA: z.string(),
  UE: z.string(),
  CatPrg: z.string(),
  FTE: z.string(),
  Org: z.string(),
  Objeto: z.string(),
  Descripcion: z.string(),
  PresupVig: z.number(),
  Devengado: z.number(),
  Porcen: z.number(),
});

export type DTO_contentXlsxPreUnidad = z.infer<typeof contentXlsxPreUnidad>;
export type DTO_filePreUnidad = z.infer<typeof filePreUnidad>;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentXlsxPreUnidad = exports.filePreUnidad = void 0;
const zod_1 = require("zod");
exports.filePreUnidad = zod_1.z.object({
    originalname: zod_1.z.string().nonempty("El archivo debe tener un nombre"),
    mimetype: zod_1.z.enum([
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ], {
        errorMap: () => ({
            message: "El tipo de archivo no es válido (solo Excel)",
        }),
    }),
    size: zod_1.z
        .number()
        .max(10 * 1024 * 1024, "El archivo excede el tamaño permitido (10MB)"),
    buffer: zod_1.z.instanceof(Buffer, {
        message: "El contenido del archivo es inválido",
    }),
});
exports.contentXlsxPreUnidad = zod_1.z.object({
    DA: zod_1.z.string(),
    UE: zod_1.z.string(),
    CatPrg: zod_1.z.string(),
    FTE: zod_1.z.string(),
    Org: zod_1.z.any(),
    Objeto: zod_1.z.string(),
    Descripcion: zod_1.z.string(),
    PresupVig: zod_1.z.number(),
    Devengado: zod_1.z.number(),
    Porcen: zod_1.z.number(),
});

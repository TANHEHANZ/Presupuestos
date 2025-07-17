"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UvalidateR = exports.Uvalidate = void 0;
const zod_1 = require("zod");
exports.Uvalidate = zod_1.z.object({
    ci: zod_1.z
        .string()
        .min(6, "La CI boliviana debe tener al menos 6 dígitos")
        .max(10, "La CI boliviana no puede tener más de 10 dígitos")
        .regex(/^\d+$/, "La CI solo debe contener números")
        .refine((ci) => {
        return !/^(\d)\1+$/.test(ci);
    }, "La CI no puede ser una secuencia de números repetidos"),
});
exports.UvalidateR = zod_1.z.object({
    empleado: zod_1.z.string(),
    ci: zod_1.z.string(),
    item: zod_1.z.string(),
    unidad: zod_1.z.string(),
    cargo: zod_1.z.string(),
    institucion: zod_1.z.string(),
    id_tipocontrato: zod_1.z.string(),
    tipocontrato: zod_1.z.string(),
    nombre: zod_1.z.string(),
    otro_nombre: zod_1.z.string(),
    paterno: zod_1.z.string(),
    materno: zod_1.z.string(),
});

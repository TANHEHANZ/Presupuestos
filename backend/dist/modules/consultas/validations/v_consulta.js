"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consultaSchema = void 0;
const zod_1 = require("zod");
exports.consultaSchema = zod_1.z.object({
    page: zod_1.z.number(),
    limit: zod_1.z.number(),
    tipoGasto: zod_1.z.enum(["ELEGIBLES", "FUNCIONAMIENTO"]).optional(),
    da: zod_1.z.number().optional(),
    fte: zod_1.z.number().optional(),
    catProgDesde: zod_1.z.string().optional(),
    catProgHasta: zod_1.z.string().optional(),
    ueDesde: zod_1.z.number().optional(),
    ueHasta: zod_1.z.number().optional(),
    orgDesde: zod_1.z.number().optional(),
    orgHasta: zod_1.z.number().optional(),
    descripcion: zod_1.z.string().optional(),
    objetoGasto: zod_1.z.string().optional(),
    descripcionGasto: zod_1.z.string().optional(),
    operador: zod_1.z.enum(["IGUAL", "MAYOR_QUE", "MENOR_QUE"]).optional(),
    presupuestoVigenteComparar: zod_1.z.number().optional(),
    periodo: zod_1.z.any().optional(),
});

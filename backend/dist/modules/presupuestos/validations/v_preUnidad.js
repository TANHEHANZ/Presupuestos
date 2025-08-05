"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preUnidadSchema = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
exports.preUnidadSchema = zod_1.z.object({
    mes: zod_1.z.date(),
    da: zod_1.z.number(),
    ue: zod_1.z.number(),
    catPrg: zod_1.z.string(),
    fte: zod_1.z.number(),
    org: zod_1.z.number(),
    objetoGasto: zod_1.z.string(),
    codigoObjetoGasto: zod_1.z.string(),
    presupuestoVigente: zod_1.z.number(),
    devengado: zod_1.z.number(),
    porcentajeEjecucion: zod_1.z.number(),
    descrpcionObjetoGasto: zod_1.z.string(),
    estado: zod_1.z.nativeEnum(client_1.EstadoRegistro),
    unidadId: zod_1.z.string(),
    creadoPorId: zod_1.z.string(),
});

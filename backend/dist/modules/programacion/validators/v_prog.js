"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParamsSchema = void 0;
const zod_1 = require("zod");
const SchemaProgramacion = zod_1.z.object({
    mes: zod_1.z.string(),
    value: zod_1.z.number(),
});
exports.ParamsSchema = zod_1.z.object({
    idPresupuesto: zod_1.z.string(),
    programacion: zod_1.z.array(SchemaProgramacion),
});

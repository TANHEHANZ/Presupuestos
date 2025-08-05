"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const meses = zod_1.z.object({
    mes: zod_1.z.string(),
    value: zod_1.z.string(),
});
const response = zod_1.z.object({
    meses: zod_1.z.array(meses),
    mesActual: zod_1.z.string(),
    asigado: zod_1.z.boolean(),
    TotalAsignado: zod_1.z.number(),
});

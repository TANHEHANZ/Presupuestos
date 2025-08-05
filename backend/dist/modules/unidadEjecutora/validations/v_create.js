"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUnidadSchema = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
exports.CreateUnidadSchema = zod_1.z.object({
    ue: zod_1.z.string(),
    secretaria: zod_1.z.string(),
    descripcion: zod_1.z.string(),
    estado: zod_1.z.nativeEnum(client_1.U_estado),
});

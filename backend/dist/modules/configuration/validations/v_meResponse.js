"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeResponse = void 0;
const zod_1 = require("zod");
const navigationItem = zod_1.z.object({
    label: zod_1.z.string(),
    icon: zod_1.z.string(),
    path: zod_1.z.string(),
});
const navigationGroup = zod_1.z.object({
    title: zod_1.z.string(),
    items: zod_1.z.array(navigationItem),
});
const user = zod_1.z.object({
    name: zod_1.z.string(),
    rol: zod_1.z.string(),
    unidad: zod_1.z.string(),
});
exports.MeResponse = zod_1.z.object({
    _n: zod_1.z.array(navigationGroup),
    _p: zod_1.z.array(zod_1.z.string()),
    _u: user,
});

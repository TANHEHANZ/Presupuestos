"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Credentials = void 0;
const zod_1 = require("zod");
exports.Credentials = zod_1.z
    .object({
    ci: zod_1.z.string(),
    password: zod_1.z.string(),
})
    .strict();

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordSchema = void 0;
const zod_1 = require("zod");
exports.changePasswordSchema = zod_1.z
    .object({
    password: zod_1.z.string(),
    confirmChange: zod_1.z.boolean(),
    newPassword: zod_1.z.string(),
})
    .strict();

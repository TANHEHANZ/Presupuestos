"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaC = void 0;
const client_1 = require("@prisma/client");
exports.prismaC = global.prisma ||
    new client_1.PrismaClient({
        log: ["query", "info", "warn", "error"],
    });
if (process.env.NODE_ENV !== "production") {
    global.prisma = exports.prismaC;
}

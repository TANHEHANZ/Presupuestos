"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ln_service = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma_client_1 = require("../../../infraestructure/config/prisma.client");
const crypto_1 = require("../../../infraestructure/middleware/crypto");
exports.Ln_service = {
    login: async ({ ci, password }) => {
        const user = await prisma_client_1.prismaC.user.findUnique({
            where: { ci },
        });
        if (!user) {
            throw new Error("Credenciales inválidas. Por favor, verifica tu cédula o contraseña.");
        }
        const validPassword = await bcryptjs_1.default.compare(password, user.password);
        if (!validPassword) {
            throw new Error("Contraseña incorrecta.");
        }
        const payloadAccess = { id: user.id, exp: Date.now() + 15 * 60 * 1000 };
        const { encryptedData: encryptedAccess, iv: ivAccess } = (0, crypto_1.encryptPayload)(payloadAccess);
        const accessToken = `${ivAccess}.${encryptedAccess}`;
        const payloadRefresh = {
            id: user.id,
            exp: Date.now() + 7 * 24 * 60 * 60 * 1000,
        };
        const { encryptedData: encryptedRefresh, iv: ivRefresh } = (0, crypto_1.encryptPayload)(payloadRefresh);
        const refreshToken = `${ivRefresh}.${encryptedRefresh}`;
        return { accessToken, refreshToken };
    },
    refresh: async (token) => {
        const parts = token.split(".");
        if (parts.length !== 3) {
            throw new Error("Token de refresh inválido o manipulado");
        }
        const [iv, encryptedData, authTag] = parts;
        const payload = (0, crypto_1.decryptPayload)(`${encryptedData}.${authTag}`, iv);
        if (!payload.exp || Date.now() > payload.exp) {
            throw new Error("Token de refresh expirado");
        }
        const newPayload = {
            id: payload.id,
            exp: Date.now() + 3 * 60 * 60 * 1000,
        };
        const { encryptedData: newEncrypted, iv: newIv } = (0, crypto_1.encryptPayload)(newPayload);
        const newAccessToken = `${newIv}.${newEncrypted}`;
        return newAccessToken;
    },
};

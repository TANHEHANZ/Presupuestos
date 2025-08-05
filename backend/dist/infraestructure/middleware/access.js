"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validAcces = void 0;
const crypto_1 = require("../../infraestructure/middleware/crypto");
const response_1 = require("../config/response");
const validAcces = async (req, res, next) => {
    try {
        const token = req.cookies.accessToken;
        if (!token) {
            response_1.API.unauthorized(res, "Token no proporcionado");
            return;
        }
        console.log(token);
        const [iv, ciphertext, authTag] = token.split(".");
        if (!iv || !ciphertext || !authTag) {
            response_1.API.unauthorized(res, "Token manipulado");
            return;
        }
        const payload = (0, crypto_1.decryptPayload)(`${ciphertext}.${authTag}`, iv);
        if (!payload.exp || Date.now() > payload.exp) {
            response_1.API.unauthorized(res, "Token expirado");
            return;
        }
        req.user = payload;
        console.log("informacion decodificado", payload);
        next();
    }
    catch (error) {
        response_1.API.unauthorized(res, "Token inválido o corrupto");
        return;
    }
};
exports.validAcces = validAcces;

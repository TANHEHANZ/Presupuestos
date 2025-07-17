"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.meController = void 0;
const me_service_1 = require("../services/me_service");
const response_1 = require("../../../infraestructure/config/response");
exports.meController = {
    me: async (req, res) => {
        const idUser = req.user?.id;
        const me = await me_service_1.meService.getMe(idUser);
        response_1.API.success(res, "me obtenidos exitosamente ", me);
    },
    validate_me: async (req, res) => {
        const idUser = req.user?.id;
        const token = req.headers["x-token"];
        console.log(token);
        if (!token) {
            response_1.API.unauthorized(res, "No se proporciociono los datos necesarios");
            return;
        }
        try {
            const valid = await me_service_1.meService.validate(idUser, token);
            if (!valid) {
                response_1.API.unauthorized(res, "Token inválido o modificado");
                return;
            }
            response_1.API.success(res, "Token válido", true);
        }
        catch (error) {
            response_1.API.serverError(res, "Error al validar el token");
        }
    },
    profile: async (req, res) => {
        const userId = req.user?.id;
        try {
            const ProdileR = await me_service_1.meService.profile(userId);
            response_1.API.success(res, "Mi perfil obtenido exitosamente", ProdileR);
        }
        catch (error) {
            const message = error instanceof Error
                ? error.message
                : "Error desconocido al obtener el perfil";
            response_1.API.serverError(res, message);
        }
    },
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PController = void 0;
const response_1 = require("../../../infraestructure/config/response");
const p_service_1 = require("../services/p_service");
exports.PController = {
    get: async (req, res) => {
        const permisos = await p_service_1.P_service.all();
        response_1.API.success(res, "Permisos obtenidos exitosamente ", permisos);
    },
    key: async (req, res) => {
        const permisos = await p_service_1.P_service.key();
        response_1.API.success(res, "Permisos obtenidos exitosamente ", permisos);
    },
};

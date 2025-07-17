"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DAController = void 0;
const C_DA_service_1 = require("../services/C_DA.service");
const response_1 = require("../../../infraestructure/config/response");
const DAController = async (req, res) => {
    try {
        const daValues = await (0, C_DA_service_1.DAService)();
        response_1.API.success(res, "DA obtenidas correctamente", daValues);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Error desconocido";
        response_1.API.serverError(res, message);
    }
};
exports.DAController = DAController;

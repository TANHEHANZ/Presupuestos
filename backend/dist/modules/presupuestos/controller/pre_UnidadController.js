"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreUnidadController = void 0;
const preUnidad_service_1 = require("../services/preUnidad.service");
const response_1 = require("../../../infraestructure/config/response");
exports.PreUnidadController = {
    get: async (req, res) => {
        try {
            const { ue, descripcionUe } = req.query;
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 8;
            const list = await preUnidad_service_1.PreUnidadService.list({
                ue: ue,
                descripcionUe: descripcionUe,
                page,
                limit,
            });
            response_1.API.paginated(res, "Presupuesto por unidad traida exitosamente", {
                items: list.data,
                total: list.totalItems,
                page: list.currentPage,
                limit: limit,
                totalPages: list.totalPages,
            });
        }
        catch (error) {
            console.error("Error en list:", error);
            response_1.API.serverError(res, "Error al listar resumen de unidades ejecutoras", error);
        }
    },
    listUEgrup: async (req, res) => {
        try {
            const { ue, descripcionUe } = req.query;
            const list = await preUnidad_service_1.PreUnidadService.listUEgrup({
                ue: ue,
                descripcionUe: descripcionUe,
            });
            res.json(list);
        }
        catch (error) {
            console.error("Error en listUEgrup:", error);
            res.status(500).json({ message: "Error al listar unidades ejecutoras" });
        }
    },
    create: async (req, res) => {
        res.json({ message: "Método create no implementado" });
    },
};

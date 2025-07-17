"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProyectController = void 0;
const response_1 = require("../../../infraestructure/config/response");
const presupuestos_service_1 = require("../services/presupuestos.service");
exports.ProyectController = {
    list: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 8;
            const descripcion = req.query.descripcion?.toString();
            const org = req.query.org?.toString();
            const objeto = req.query.objeto?.toString();
            const descripcionGasto = req.query.descripcionGasto?.toString();
            const result = await presupuestos_service_1.ProyectService.list({
                page: page.toString(),
                limit: limit.toString(),
                descripcion,
                org,
                objeto,
                descripcionGasto,
            });
            response_1.API.paginated(res, "Proyectos traídos exitosamente", {
                items: result.data,
                total: result.totalItems,
                page: result.currentPage,
                limit: limit,
                totalPages: result.totalPages,
            });
        }
        catch (error) {
            response_1.API.serverError(res, "Error al listar Proyectos", error);
        }
    },
    calendar: async (req, res) => {
        try {
            const calendar = await presupuestos_service_1.ProyectService.dataCalendar();
            response_1.API.success(res, "Calendario obtenido exitosamente", calendar);
        }
        catch (error) {
            response_1.API.serverError(res, error instanceof Error ? error.message : "Error desconocido");
        }
    },
};

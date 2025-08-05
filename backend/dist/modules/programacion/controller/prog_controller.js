"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Prog_controller = void 0;
const prog_service_1 = require("../services/prog_service");
const response_1 = require("../../../infraestructure/config/response");
exports.Prog_controller = {
    create: async (req, res) => {
        const userId = req.user?.id;
        try {
            const create = await prog_service_1.Prog_service.create(req.body, userId);
            response_1.API.success(res, "Programacion realizada", create);
        }
        catch (error) {
            console.error("Error en programación:", error); // Log para depuración
            response_1.API.serverError(res, error.message || "Error desconocido");
        }
    },
    list: async (req, res) => {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const descripcion = req.query.descripcion?.toString();
        const org = req.query.org?.toString();
        const objeto = req.query.objeto?.toString();
        const descripcionGasto = req.query.descripcionGasto?.toString();
        try {
            const result = await prog_service_1.Prog_service.list({
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
};

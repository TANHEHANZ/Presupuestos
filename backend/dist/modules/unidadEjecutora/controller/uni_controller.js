"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Uni_controller = void 0;
const uni_service_1 = require("../services/uni_service");
const error_1 = require("../../../infraestructure/helpers/error");
const response_1 = require("../../../infraestructure/config/response");
exports.Uni_controller = {
    all: async (req, res) => {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        try {
            const unidades = await uni_service_1.Uni_service.all({
                page: page,
                limit: limit,
            });
            response_1.API.paginated(res, "Unidades ejecutoras obtenidas exitosamente", {
                items: unidades.data,
                total: unidades.totalItems,
                page: unidades.currentPage,
                limit: limit,
                totalPages: unidades.totalPages,
            });
        }
        catch (err) {
            response_1.API.serverError(res, "Ocurrió un error al obtener las unidades ejecutoras", err);
        }
    },
    info: async (req, res) => {
        try {
            const id = req.params.id;
            if (!id)
                throw new error_1.ValidationError("El parámetro 'id' es requerido.");
            const unidad = await uni_service_1.Uni_service.info(id);
            if (!unidad)
                throw new error_1.NotFoundError("La unidad ejecutora no fue encontrada.");
            response_1.API.success(res, "Unidad ejecutora obtenida exitosamente", unidad);
        }
        catch (err) {
            if (err instanceof error_1.ValidationError) {
                response_1.API.badRequest(res, "Error de validación", err);
                return;
            }
            if (err instanceof error_1.NotFoundError) {
                response_1.API.notFound(res, err.message);
                return;
            }
            response_1.API.serverError(res, "Ocurrió un error al obtener la unidad ejecutora", err);
            return;
        }
    },
    create: async (req, res) => {
        try {
            const unidad = await uni_service_1.Uni_service.create(req.body);
            response_1.API.created(res, "Unidad ejecutora creada exitosamente", unidad);
        }
        catch (err) {
            response_1.API.serverError(res, err.message || "Error al crear la unidad ejecutora");
        }
    },
    update: async (req, res) => {
        try {
            const unidad = await uni_service_1.Uni_service.update(req.body);
            response_1.API.success(res, "Unidad ejecutora actualizada exitosamente", unidad);
        }
        catch (err) {
            response_1.API.serverError(res, err.message || "Error al crear la unidad ejecutora");
        }
    },
    delete: async (req, res) => {
        try {
            const id = req.body;
            const unidad = await uni_service_1.Uni_service.delete(id);
            response_1.API.success(res, "Unidad ejecutora marcada como inactiva", unidad);
        }
        catch (err) {
            if (err instanceof error_1.ValidationError) {
                response_1.API.badRequest(res, "Error de validación", err);
                return;
            }
            response_1.API.serverError(res, "Ocurrió un error al eliminar la unidad ejecutora", err);
        }
    },
};

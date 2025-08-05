"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterController = void 0;
const response_1 = require("../../../infraestructure/config/response");
const filter_service_1 = require("../services/filter.service");
const FilterController = async (req, res) => {
    try {
        const params = req.query;
        const data = await (0, filter_service_1.FilterService)(params);
        response_1.API.paginated(res, "Consulta realizada correctamente", {
            items: data.data,
            total: data.totalItems,
            page: data.currentPage,
            limit: Number(params.limit) || 0,
            totalPages: data.totalPages,
        });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Error desconocido";
        response_1.API.serverError(res, message);
    }
};
exports.FilterController = FilterController;

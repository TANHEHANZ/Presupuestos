"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadXlsx = void 0;
const response_1 = require("../../../infraestructure/config/response");
const xlsx_config_1 = require("../../../infraestructure/lib/xlsx/xlsx.config");
const getdataXlsx_service_1 = require("../services/getdataXlsx.service");
const save_preUnidad_service_1 = require("../services/save.preUnidad.service");
const error_1 = require("../../../infraestructure/helpers/error");
const uploadXlsx = async (req, res) => {
    console.log("idUusario", req.user.id);
    const userId = req.user.id;
    if (!req.file) {
        response_1.API.notFound(res, "No se subió ningún archivo");
        return;
    }
    try {
        const data = (0, xlsx_config_1.readXlsx)(req.file.buffer);
        const result = (0, getdataXlsx_service_1.getdataXlsxService)(data);
        if (!result.success) {
            console.log(JSON.stringify(result.data, null, 2));
            switch (result.type) {
                case "MISSING_COLUMNS":
                    response_1.API.conflict(res, "Faltan columnas requeridas en el archivo", result.data);
                    return;
                case "UNRECOGNIZED_COLUMNS":
                    response_1.API.conflict(res, "Archivo válido con columnas adicionales no reconocidas", result.data);
                    return;
                case "ROW_ERRORS":
                    response_1.API.conflict(res, "Errores en algunas filas", result.data);
                    return;
                default:
                    response_1.API.serverError(res, "Error inesperado");
                    return;
            }
        }
        if (result.success) {
            const rowsToSave = result.data.valid;
            const saved = await (0, save_preUnidad_service_1.savePresupuestoUnidades)({
                mes: new Date(),
                userId,
                valueXlsx: rowsToSave,
            });
            response_1.API.success(res, "Archivo procesado y guardado correctamente", {
                savedCount: saved.length,
            });
            return;
        }
        response_1.API.success(res, "Archivo procesado correctamente", result.data);
    }
    catch (error) {
        if (error instanceof error_1.MissingUnidadError) {
            response_1.API.conflict(res, error.message);
            return;
        }
        response_1.API.serverError(res, error instanceof Error ? error.message : "Error desconocido");
        return;
    }
};
exports.uploadXlsx = uploadXlsx;

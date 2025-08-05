"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const zod_1 = require("zod");
const zod_validation_error_1 = require("zod-validation-error");
const response_1 = require("../config/response");
const validate = (schema, type = "body") => (req, res, next) => {
    try {
        let dataToValidate;
        switch (type) {
            case "query":
                dataToValidate = req.query;
                break;
            case "file":
                if (!req.file) {
                    throw new Error("No se encontró el archivo");
                }
                dataToValidate = req.file;
                break;
            default:
                dataToValidate = req.body;
        }
        schema.parse(dataToValidate);
        next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            const e = (0, zod_validation_error_1.fromError)(error).details;
            response_1.API.conflict(res, "Error de validacion", e);
            return;
        }
        response_1.API.serverError(res, "Error de validacion", error instanceof Error ? error.message : "Ocurrió un error inesperado");
        return;
    }
};
exports.validate = validate;

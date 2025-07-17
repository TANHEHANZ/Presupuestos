"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getdataXlsxService = void 0;
const v_upload_1 = require("../validations/v_upload");
const xlsx_config_1 = require("../../../infraestructure/lib/xlsx/xlsx.config");
const xlsx_valid_rows_1 = require("../../../infraestructure/lib/xlsx/xlsx.valid.rows");
const v_PresupuestoUnidad_1 = require("../../../infraestructure/validations/v_PresupuestoUnidad");
const getdataXlsxService = (data) => {
    if (data.length === 0) {
        throw new Error("El archivo está vacío");
    }
    const rawHeader = data[0];
    const stringHeader = rawHeader.map((cell) => String(cell ?? "").trim());
    const { mappedFields, missingFields, unrecognizedColumns } = (0, v_PresupuestoUnidad_1.validateXlsxHeader)(stringHeader);
    if (missingFields.length > 0) {
        return {
            success: false,
            type: "MISSING_COLUMNS",
            data: { missingFields, unrecognizedColumns },
        };
    }
    if (unrecognizedColumns.length > 0) {
        return {
            success: false,
            type: "UNRECOGNIZED_COLUMNS",
            data: { mappedFields, unrecognizedColumns },
        };
    }
    const rowsObjects = (0, xlsx_config_1.XlsxBody)(data, mappedFields);
    const { valid, errors } = (0, xlsx_valid_rows_1.validateRows)(rowsObjects, v_upload_1.contentXlsxPreUnidad);
    if (errors.length > 0) {
        const formattedErrors = errors.map(({ row, error }) => ({
            row,
            issues: error.issues.map(({ path, message, code }) => ({
                path,
                message,
                code,
            })),
        }));
        console.log(JSON.stringify(formattedErrors, null, 2));
        return {
            success: false,
            type: "ROW_ERRORS",
            data: { errors: formattedErrors },
        };
    }
    return {
        success: true,
        data: {
            mappedFields,
            valid,
        },
    };
};
exports.getdataXlsxService = getdataXlsxService;

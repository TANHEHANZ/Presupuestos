"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateXlsxHeader = validateXlsxHeader;
const v_upload_1 = require("../../modules/presupuestos/validations/v_upload");
const xlsx_config_1 = require("../lib/xlsx/xlsx.config");
const headerMap = {
    DA: "DA",
    UE: "UE",
    "Cat. Prg.": "CatPrg",
    FTE: "FTE",
    "Org.": "Org",
    Objeto: "Objeto",
    "Descripcion Objeto Del Gasto": "Descripcion",
    "Presup. Vig.": "PresupVig",
    Devengado: "Devengado",
    "Porcen.": "Porcen",
};
function validateXlsxHeader(rawHeader) {
    const { mappedFields, unrecognizedColumns } = (0, xlsx_config_1.mapXlsxHeader)(rawHeader, headerMap);
    const requiredFields = Object.keys(v_upload_1.contentXlsxPreUnidad.shape);
    const missingFields = requiredFields.filter((field) => !mappedFields.includes(field));
    return {
        mappedFields,
        missingFields,
        unrecognizedColumns,
    };
}

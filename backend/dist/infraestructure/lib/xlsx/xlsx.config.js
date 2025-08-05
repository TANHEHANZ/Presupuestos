"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.readXlsx = readXlsx;
exports.mapXlsxHeader = mapXlsxHeader;
exports.XlsxBody = XlsxBody;
const XLSX = __importStar(require("xlsx"));
function readXlsx(buffer) {
    const workbook = XLSX.read(buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    if (!Array.isArray(data) || !data.every((row) => Array.isArray(row))) {
        throw new Error("Formato inesperado en el archivo XLSX");
    }
    return data;
}
function mapXlsxHeader(rawHeader, headerMap) {
    const stringHeader = rawHeader.map((cell) => String(cell || "").trim());
    const mapped = stringHeader.map((col) => headerMap[col] || null);
    return {
        mappedFields: mapped.filter((f) => f !== null),
        unrecognizedColumns: stringHeader.filter((_, i) => mapped[i] === null),
    };
}
function XlsxBody(data, mappedFields) {
    const rows = data.slice(1);
    return rows
        .map((row) => {
        const obj = {};
        mappedFields.forEach((field, index) => {
            obj[field] = row[index];
        });
        return obj;
    })
        .filter((obj) => Object.values(obj).some((value) => value !== null && value !== undefined && value !== ""));
}

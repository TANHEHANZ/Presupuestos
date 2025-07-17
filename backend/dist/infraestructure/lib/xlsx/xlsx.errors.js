"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleXlsxError = handleXlsxError;
const response_1 = require("../../../infraestructure/config/response");
function handleXlsxError(res, message, details) {
    response_1.API.conflict(res, message, details);
}

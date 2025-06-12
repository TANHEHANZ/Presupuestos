"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.API = void 0;
const http_1 = require("../constants/http");
exports.API = {
    createResponse: (res, status, message, data, errors) => {
        const response = {
            status,
            message,
            metadata: {
                timestamp: new Date().toISOString(),
                path: res.req.originalUrl,
            },
        };
        if (data)
            response.data = data;
        if (errors)
            response.errors = errors;
        return res.status(status).json(response);
    },
    success: (res, message, data) => exports.API.createResponse(res, http_1.HTTP_STATUS.OK, message, data),
    created: (res, message, data) => exports.API.createResponse(res, http_1.HTTP_STATUS.CREATED, message, data),
    paginated: (res, message, paginatedData) => exports.API.createResponse(res, http_1.HTTP_STATUS.OK, message, paginatedData),
    badRequest: (res, message, errors) => exports.API.createResponse(res, http_1.HTTP_STATUS.BAD_REQUEST, message, undefined, errors),
    unauthorized: (res, message = "Unauthorized") => exports.API.createResponse(res, http_1.HTTP_STATUS.UNAUTHORIZED, message),
    forbidden: (res, message = "Forbidden") => exports.API.createResponse(res, http_1.HTTP_STATUS.FORBIDDEN, message),
    notFound: (res, message = "Not Found") => exports.API.createResponse(res, http_1.HTTP_STATUS.NOT_FOUND, message),
    conflict: (res, message, errors) => exports.API.createResponse(res, http_1.HTTP_STATUS.CONFLICT, message, undefined, errors),
    serverError: (res, message = "Error en el servidor contactate con hancito :)", errors) => {
        return exports.API.createResponse(res, http_1.HTTP_STATUS.INTERNAL_SERVER, errors, undefined, process.env.NODE_ENV === "development" ? errors : undefined);
    },
    custom: (res, status, message, data, errors) => exports.API.createResponse(res, status, message, data, errors),
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissingUnidadError = exports.NotFoundError = exports.ValidationError = void 0;
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}
exports.ValidationError = ValidationError;
class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "NotFoundError";
    }
}
exports.NotFoundError = NotFoundError;
class MissingUnidadError extends Error {
    constructor(ueCode) {
        super(`UnidadEjecutora con código UE="${ueCode}" no existe.`);
        this.name = "MissingUnidadError";
        this.ueCode = ueCode;
    }
}
exports.MissingUnidadError = MissingUnidadError;

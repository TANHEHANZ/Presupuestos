"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ucontroller = void 0;
const response_1 = require("../../../infraestructure/config/response");
const error_1 = require("../../../infraestructure/helpers/error");
const u_service_1 = require("../../../modules/user/services/u_service");
exports.Ucontroller = {
    validate: async (req, res) => {
        try {
            const data = await u_service_1.Uservice.uValidate(req.body);
            response_1.API.success(res, "Usuario válido", data);
            return;
        }
        catch (error) {
            if (error instanceof error_1.ValidationError) {
                response_1.API.badRequest(res, error.message);
                return;
            }
            if (error instanceof error_1.NotFoundError) {
                response_1.API.notFound(res, error.message);
                return;
            }
            response_1.API.serverError(res, "No se pudo validar el usuario.", error);
            return;
        }
    },
    create: async (req, res) => {
        try {
            const createData = await u_service_1.Uservice.create(req.body);
            response_1.API.success(res, "Usuario creado", createData);
        }
        catch (error) {
            console.log(error);
            if (error instanceof error_1.NotFoundError) {
                response_1.API.notFound(res, error.message);
                return;
            }
            if (error instanceof error_1.ValidationError) {
                response_1.API.badRequest(res, error.message);
                return;
            }
            response_1.API.serverError(res, "No se pudo crear usuario.", error);
            return;
        }
    },
    get: async (req, res) => {
        try {
            const users = await u_service_1.Uservice.all();
            response_1.API.success(res, "Usuario traido con exito", users);
            return;
        }
        catch (error) {
            response_1.API.badRequest(res, "Error al iniciar sesión", error);
            return;
        }
    },
    changePassword: async (req, res) => {
        try {
            const userId = req.user?.id;
            if (!userId) {
                response_1.API.unauthorized(res, "No tienes acceso");
                return;
            }
            const change = await u_service_1.Uservice.changePassword({
                change: req.body,
                idUser: userId,
            });
            response_1.API.success(res, "Contraseña cambiada con exito", change);
        }
        catch (error) {
            response_1.API.badRequest(res, "Error al iniciar sesión", error);
        }
    },
    edit: async (req, res) => {
        try {
            const editUser = await u_service_1.Uservice.update(req.body);
            response_1.API.success(res, "Usuario editado", editUser);
        }
        catch (error) {
            console.log(error);
            if (error instanceof error_1.NotFoundError) {
                response_1.API.notFound(res, error.message);
                return;
            }
            if (error instanceof error_1.ValidationError) {
                response_1.API.badRequest(res, error.message);
                return;
            }
            response_1.API.serverError(res, "No se pudo editar al  usuario.", error);
            return;
        }
    },
};

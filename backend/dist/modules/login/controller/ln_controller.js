"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lnController = void 0;
const ln_service_1 = require("../services/ln_service");
const response_1 = require("../../../infraestructure/config/response");
exports.lnController = {
    login: async (req, res) => {
        try {
            const { accessToken, refreshToken } = await ln_service_1.Ln_service.login(req.body);
            res.cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: 15 * 60 * 1000,
            });
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
            response_1.API.success(res, "Inicio de sesión exitoso");
        }
        catch (err) {
            console.log(err);
            response_1.API.badRequest(res, "Error al iniciar sesión", err);
        }
    },
    refresh: async (req, res) => {
        try {
            const refreshToken = req.cookies.refreshToken;
            console.log(refreshToken);
            if (!refreshToken) {
                response_1.API.unauthorized(res, "No se proporcionó el token de actualización");
                return;
            }
            const newAccessToken = await ln_service_1.Ln_service.refresh(refreshToken);
            res.cookie("accessToken", newAccessToken, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: 3 * 60 * 60 * 1000,
            });
            response_1.API.success(res, "Nuevo token generado correctamente");
        }
        catch (err) {
            response_1.API.unauthorized(res, err.message);
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie("accessToken", {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                path: "/",
            });
            res.clearCookie("refreshToken", {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                path: "/",
            });
            response_1.API.success(res, "Sesión cerrada correctamente");
        }
        catch (err) {
            response_1.API.serverError(res, "Error al cerrar sesión");
        }
    },
};

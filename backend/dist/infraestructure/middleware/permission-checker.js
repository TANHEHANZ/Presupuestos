"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPermission = void 0;
const prisma_client_1 = require("../config/prisma.client");
const response_1 = require("../config/response");
const checkPermission = (requiredPermissions) => {
    return async (req, res, next) => {
        const userId = req.user?.id;
        if (!userId) {
            response_1.API.unauthorized(res, "No estás autorizado");
            return;
        }
        try {
            const user = await prisma_client_1.prismaC.user.findUnique({
                where: { id: userId },
                select: { permisos: true },
            });
            const userPermissions = user?.permisos ?? [];
            const requiredArray = Array.isArray(requiredPermissions)
                ? requiredPermissions
                : [requiredPermissions];
            const hasRequiredPermission = userPermissions.includes("ALL") ||
                requiredArray.some((perm) => userPermissions.includes(perm));
            if (!hasRequiredPermission) {
                response_1.API.unauthorized(res, "No tienes permiso para esta acción");
                return;
            }
            next();
        }
        catch (error) {
            response_1.API.serverError(res, "Error. Contacta con Hancito, él te ayudará ;)", error);
        }
    };
};
exports.checkPermission = checkPermission;

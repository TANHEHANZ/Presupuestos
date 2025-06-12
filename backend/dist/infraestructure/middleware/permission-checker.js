"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPermission = void 0;
const prisma_client_1 = require("../config/prisma.client");
const response_1 = require("../config/response");
const checkPermission = (requiredPermission) => {
    return (req, res, next) => {
        const userId = req.user?.id;
        if (!userId) {
            response_1.API.unauthorized(res, "No esta autorizado");
            return;
        }
        prisma_client_1.prismaC.user
            .findUnique({
            where: { id: userId },
            select: {
                permisos: {
                    where: {
                        estado: "ACTIVO",
                    },
                    select: {
                        nombre: true,
                    },
                },
            },
        })
            .then((userWithPerms) => {
            const userPermissions = userWithPerms?.permisos.map((p) => p.nombre) ?? [];
            if (!userPermissions.includes(requiredPermission)) {
                return response_1.API.unauthorized(res, "No tienes permiso para esta acción");
            }
            next();
        })
            .catch((error) => {
            response_1.API.serverError(res, "Error contactate con hancito el te ayudara ;)", error);
        });
    };
};
exports.checkPermission = checkPermission;

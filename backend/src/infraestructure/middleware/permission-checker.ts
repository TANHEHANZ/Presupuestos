import { Request, Response, NextFunction } from "express";
import { prismaC } from "../config/prisma.client";
import { API } from "../config/response";

export const checkPermission = (requiredPermission: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;

    if (!userId) {
      API.unauthorized(res, "No esta autorizado");
      return;
    }

    prismaC.user
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
        const userPermissions =
          userWithPerms?.permisos.map((p) => p.nombre) ?? [];

        if (!userPermissions.includes(requiredPermission)) {
          return API.unauthorized(res, "No tienes permiso para esta acción");
        }

        next();
      })
      .catch((error) => {
        API.serverError(
          res,
          "Error contactate con hancito el te ayudara ;)",
          error
        );
      });
  };
};

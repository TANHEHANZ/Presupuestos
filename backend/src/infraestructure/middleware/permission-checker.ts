import { Request, Response, NextFunction } from "express";
import { prismaC } from "../config/prisma.client";
import { API } from "../config/response";
export const checkPermission = (requiredPermissions: string | string[]) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const userId = req.user?.id;

    if (!userId) {
      API.unauthorized(res, "No estás autorizado");
      return;
    }

    try {
      const user = await prismaC.user.findUnique({
        where: { id: userId },
        select: { permisos: true },
      });

      const userPermissions = user?.permisos ?? [];

      const requiredArray = Array.isArray(requiredPermissions)
        ? requiredPermissions
        : [requiredPermissions];

      const hasRequiredPermission =
        userPermissions.includes("ALL") ||
        requiredArray.some((perm) => userPermissions.includes(perm));

      if (!hasRequiredPermission) {
        API.unauthorized(res, "No tienes permiso para esta acción");
        return;
      }

      next();
    } catch (error) {
      API.serverError(
        res,
        "Error. Contacta con Hancito, él te ayudará ;)",
        error
      );
    }
  };
};

import { Request, Response, NextFunction } from "express";
import { prismaC } from "../config/prisma.client";
import { API } from "../config/response";

export const checkPermission = (requiredPermission: string) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const userId = req.user?.id;
    console.log(userId);
    if (!userId) {
      API.unauthorized(res, "No estás autorizado");
      return;
    }

    try {
      const user = await prismaC.user.findUnique({
        where: { id: userId },
        select: { permisos: true },
      });
      console.log("permiso user", user);
      const userPermissions = user?.permisos ?? [];

      if (
        !userPermissions.includes("ALL") &&
        !userPermissions.includes(requiredPermission)
      ) {
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

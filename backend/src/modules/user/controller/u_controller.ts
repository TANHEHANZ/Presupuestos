import { API } from "@/infraestructure/config/response";
import {
  NotFoundError,
  ValidationError,
} from "@/infraestructure/helpers/error";
import { Uservice } from "@/modules/user/services/u_service";
import { Request, Response } from "express";

export const Ucontroller = {
  validate: async (req: Request, res: Response): Promise<void> => {
    try {
      const data = await Uservice.uValidate(req.body);
      API.success(res, "Usuario válido", data);
      return;
    } catch (error: any) {
      if (error instanceof ValidationError) {
        API.badRequest(res, error.message);
        return;
      }

      if (error instanceof NotFoundError) {
        API.notFound(res, error.message);
        return;
      }
      API.serverError(res, "No se pudo validar el usuario.", error);
      return;
    }
  },

  create: async (req: Request, res: Response): Promise<void> => {
    try {
      const createData = await Uservice.create(req.body);

      API.success(res, "Usuario creado", createData);
    } catch (error: any) {
      console.log(error);
      if (error instanceof NotFoundError) {
        API.notFound(res, error.message);
        return;
      }
      if (error instanceof ValidationError) {
        API.badRequest(res, error.message);
        return;
      }

      API.serverError(res, "No se pudo crear usuario.", error);
      return;
    }
  },

  get: async (req: Request, res: Response): Promise<void> => {
    console.log("idUusario", req.user!.id);
    res.json("user");
    return;
  },

  changePassword: async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        API.unauthorized(res, "No tienes acceso");
        return;
      }
      const change = await Uservice.changePassword({
        change: req.body,
        idUser: userId,
      });
      API.success(res, "Contraseña cambiada con exito", change);
    } catch (error) {
      API.badRequest(res, "Error al iniciar sesión", error);
    }
  },
};

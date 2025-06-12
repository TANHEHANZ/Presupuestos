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

  get: async (req: Request, res: Response): Promise<void> => {
    console.log("idUusario", req.user!.id);
    res.json("user");
    return;
  },
  create: async (req: Request, res: Response): Promise<void> => {},
};

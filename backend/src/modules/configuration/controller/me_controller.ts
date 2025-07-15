import { Request, Response } from "express";
import { meService } from "../services/me_service";
import { API } from "@/infraestructure/config/response";

export const meController = {
  me: async (req: Request, res: Response): Promise<void> => {
    const idUser = req.user?.id as string;
    const me = await meService.getMe(idUser);
    API.success(res, "me obtenidos exitosamente ", me);
  },
  validate_me: async (req: Request, res: Response): Promise<void> => {
    const idUser = req.user?.id as string;
    const token = req.headers["x-token"] as string;
    console.log(token);
    if (!token) {
      API.unauthorized(res, "No se proporciociono los datos necesarios");
      return;
    }
    try {
      const valid = await meService.validate(idUser, token);
      if (!valid) {
        API.unauthorized(res, "Token inválido o modificado");
        return;
      }
      API.success(res, "Token válido", true);
    } catch (error) {
      API.serverError(res, "Error al validar el token");
    }
  },
};

import { API } from "@/infraestructure/config/response";
import { Request, Response } from "express";
import { P_service } from "../services/p_service";

export const PController = {
  get: async (req: Request, res: Response): Promise<void> => {
    const permisos = await P_service.all();
    API.success(res, "Permisos obtenidos exitosamente ", permisos);
  },
  key: async (req: Request, res: Response): Promise<void> => {
    const permisos = await P_service.key();
    API.success(res, "Permisos obtenidos exitosamente ", permisos);
  },
};

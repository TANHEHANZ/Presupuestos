import { API } from "@/infraestructure/config/response";
import { Request, Response } from "express";
import { ProyectService } from "../services/presupuestos.service";

export const ProyectController = {
  list: async (req: Request, res: Response): Promise<void> => {
    try {
      const data = await ProyectService.list({});

      API.success(res, "Proyectos traidos exitosamente", data);
    } catch (error) {
      API.serverError(res, "Error al listar Proyectos", error);
    }
  },
};

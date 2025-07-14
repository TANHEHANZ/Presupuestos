import { API } from "@/infraestructure/config/response";
import { Request, Response } from "express";
import { ProyectService } from "../services/presupuestos.service";

export const ProyectController = {
  list: async (req: Request, res: Response): Promise<void> => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 8;

      const descripcion = req.query.descripcion?.toString();
      const org = req.query.org?.toString();
      const objeto = req.query.objeto?.toString();
      const descripcionGasto = req.query.descripcionGasto?.toString();

      const result = await ProyectService.list({
        page: page.toString(),
        limit: limit.toString(),
        descripcion,
        org,
        objeto,
        descripcionGasto,
      });

      API.paginated(res, "Proyectos traídos exitosamente", {
        items: result.data,
        total: result.totalItems,
        page: result.currentPage,
        limit: limit,
        totalPages: result.totalPages,
      });
    } catch (error) {
      API.serverError(res, "Error al listar Proyectos", error);
    }
  },
};

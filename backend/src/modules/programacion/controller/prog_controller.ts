import { Request, Response } from "express";
import { Prog_service } from "../services/prog_service";
import { API } from "@/infraestructure/config/response";

export const Prog_controller = {
  create: async (req: Request, res: Response) => {
    const userId = req.user?.id as string;
    try {
      const create = await Prog_service.create(req.body, userId);
      API.success(res, "Programacion realizada", create);
    } catch (error: any) {
      API.serverError(res, error);
    }
  },
  list: async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const descripcion = req.query.descripcion?.toString();
    const org = req.query.org?.toString();
    const objeto = req.query.objeto?.toString();
    const descripcionGasto = req.query.descripcionGasto?.toString();

    try {
      const result = await Prog_service.list({
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

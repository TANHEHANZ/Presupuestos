import { Request, Response } from "express";
import { PreUnidadService } from "../services/preUnidad.service";
import { API } from "@/infraestructure/config/response";

export const PreUnidadController = {
  get: async (req: Request, res: Response): Promise<void> => {
    try {
      const { ue, descripcionUe } = req.query;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 8;

      const list = await PreUnidadService.list({
        ue: ue as string | undefined,
        descripcionUe: descripcionUe as string | undefined,
        page,
        limit,
      });

      API.paginated(res, "Presupuesto por unidad traida exitosamente", {
        items: list.data,
        total: list.totalItems,
        page: list.currentPage,
        limit: limit,
        totalPages: list.totalPages,
      });
    } catch (error) {
      console.error("Error en list:", error);
      API.serverError(
        res,
        "Error al listar resumen de unidades ejecutoras",
        error
      );
    }
  },
  listUEgrup: async (req: Request, res: Response): Promise<void> => {
    try {
      const { ue, descripcionUe } = req.query;
      const list = await PreUnidadService.listUEgrup({
        ue: ue as string | undefined,
        descripcionUe: descripcionUe as string | undefined,
      });

      res.json(list);
    } catch (error) {
      console.error("Error en listUEgrup:", error);
      res.status(500).json({ message: "Error al listar unidades ejecutoras" });
    }
  },

  create: async (req: Request, res: Response): Promise<void> => {
    res.json({ message: "Método create no implementado" });
  },
};

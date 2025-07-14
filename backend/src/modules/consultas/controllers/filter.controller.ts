import { Request, Response } from "express";
import { API } from "@/infraestructure/config/response";
import { FilterService } from "../services/filter.service";
import { DTO_consultaParams } from "../validations/v_consulta"; // usa el schema, no solo el tipo

export const FilterController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const params = req.query as unknown as DTO_consultaParams;
    const data = await FilterService(params);
    API.paginated(res, "Consulta realizada correctamente", {
      items: data.data,
      total: data.totalItems,
      page: data.currentPage,
      limit: Number(params.limit) || 0,
      totalPages: data.totalPages,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Error desconocido";

    API.serverError(res, message);
  }
};

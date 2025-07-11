import { Request, Response } from "express";
import { DAService } from "../services/C_DA.service";
import { API } from "@/infraestructure/config/response";
export const DAController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const daValues = await DAService();
    API.success(res, "DA obtenidas correctamente", daValues);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Error desconocido";

    API.serverError(res, message);
  }
};

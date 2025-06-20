import { Request, Response } from "express";
import { z } from "zod";
import { Uni_service } from "../services/uni_service";
import {
  NotFoundError,
  ValidationError,
} from "@/infraestructure/helpers/error";
import { API } from "@/infraestructure/config/response";

export const Uni_controller = {
  all: async (_req: Request, res: Response) => {
    try {
      const unidades = await Uni_service.all();
      API.success(res, "Unidades ejecutoras obtenidas exitosamente", unidades);
    } catch (err) {
      API.serverError(
        res,
        "Ocurrió un error al obtener las unidades ejecutoras",
        err
      );
    }
  },

  info: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      if (!id) throw new ValidationError("El parámetro 'id' es requerido.");

      const unidad = await Uni_service.info(id);
      if (!unidad)
        throw new NotFoundError("La unidad ejecutora no fue encontrada.");

      API.success(res, "Unidad ejecutora obtenida exitosamente", unidad);
    } catch (err) {
      if (err instanceof ValidationError) {
        API.badRequest(res, "Error de validación", err);
        return;
      }
      if (err instanceof NotFoundError) {
        API.notFound(res, err.message);
        return;
      }
      API.serverError(
        res,
        "Ocurrió un error al obtener la unidad ejecutora",
        err
      );
      return;
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const unidad = await Uni_service.create(req.body);
      API.created(res, "Unidad ejecutora creada exitosamente", unidad);
    } catch (err) {
      if (err instanceof z.ZodError) {
        API.badRequest(res, "Datos inválidos enviados", err);
        return;
      }
      API.serverError(
        res,
        "Ocurrió un error al crear la unidad ejecutora",
        err
      );
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      if (!id) throw new ValidationError("El parámetro 'id' es requerido.");

      const unidad = await Uni_service.update(id, req.body);
      API.success(res, "Unidad ejecutora actualizada exitosamente", unidad);
    } catch (err) {
      if (err instanceof ValidationError) {
        API.badRequest(res, "Error de validación", err);
        return;
      }
      if (err instanceof z.ZodError) {
        API.badRequest(res, "Datos inválidos enviados", err);
        return;
      }
      API.serverError(
        res,
        "Ocurrió un error al actualizar la unidad ejecutora",
        err
      );
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      if (!id) throw new ValidationError("El parámetro 'id' es requerido.");

      const unidad = await Uni_service.delete(id);
      API.success(res, "Unidad ejecutora marcada como inactiva", unidad);
    } catch (err) {
      if (err instanceof ValidationError) {
        API.badRequest(res, "Error de validación", err);
        return;
      }
      API.serverError(
        res,
        "Ocurrió un error al eliminar la unidad ejecutora",
        err
      );
    }
  },
};

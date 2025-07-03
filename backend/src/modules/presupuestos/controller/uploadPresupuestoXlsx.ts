import { API } from "@/infraestructure/config/response";
import { Request, Response } from "express";
import { readXlsx } from "@/infraestructure/lib/xlsx/xlsx.config";
import { getdataXlsxService } from "../services/getdataXlsx.service";
import { savePresupuestoUnidades } from "../services/save.preUnidad.service";
import { MissingUnidadError } from "@/infraestructure/helpers/error";

export const uploadXlsx = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log("idUusario", req.user!.id);
  const userId = req.user!.id;
  if (!req.file) {
    API.notFound(res, "No se subió ningún archivo");
    return;
  }

  try {
    const data = readXlsx(req.file.buffer);
    const result = getdataXlsxService(data);

    if (!result.success) {
      console.log(JSON.stringify(result.data, null, 2));

      switch (result.type) {
        case "MISSING_COLUMNS":
          API.conflict(
            res,
            "Faltan columnas requeridas en el archivo",
            result.data
          );
          return;
        case "UNRECOGNIZED_COLUMNS":
          API.conflict(
            res,
            "Archivo válido con columnas adicionales no reconocidas",
            result.data
          );
          return;
        case "ROW_ERRORS":
          API.conflict(res, "Errores en algunas filas", result.data);
          return;
        default:
          API.serverError(res, "Error inesperado");
          return;
      }
    }

    if (result.success) {
      const rowsToSave = result.data.valid as [];

      const saved = await savePresupuestoUnidades({
        mes: new Date(),
        userId,
        valueXlsx: rowsToSave,
      });

      API.success(res, "Archivo procesado y guardado correctamente", {
        savedCount: saved.length,
      });
      return;
    }

    API.success(res, "Archivo procesado correctamente", result.data);
  } catch (error) {
    if (error instanceof MissingUnidadError) {
      API.conflict(res, error.message);
      return;
    }
    API.serverError(
      res,
      error instanceof Error ? error.message : "Error desconocido"
    );
    return;
  }
};

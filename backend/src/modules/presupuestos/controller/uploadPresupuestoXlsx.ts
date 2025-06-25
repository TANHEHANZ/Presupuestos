import { API } from "@/infraestructure/config/response";
import { Request, Response } from "express";
import { XlsxBody, readXlsx } from "@/infraestructure/lib/xlsx/xlsx.config";
import { validateXlsxHeader } from "@/infraestructure/validations/v_PresupuestoUnidad";
import { validateRows } from "@/infraestructure/lib/xlsx/xlsx.valid.rows";
import { contentXlsxPreUnidad } from "../validations/v_upload";
export const uploadXlsx = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (!req.file) {
    API.notFound(res, "No se subió ningún archivo");
    return;
  }

  try {
    const data = readXlsx(req.file.buffer);
    if (data.length === 0) {
      API.conflict(res, "El archivo está vacío");
      return;
    }

    const rawHeader = data[0];
    const stringHeader = rawHeader.map((cell) => String(cell ?? "").trim());

    const { mappedFields, missingFields, unrecognizedColumns } =
      validateXlsxHeader(stringHeader);

    if (missingFields.length > 0) {
      API.conflict(res, "Faltan columnas requeridas en el archivo", {
        missingFields,
        unrecognizedColumns,
      });

      return;
    }

    if (unrecognizedColumns.length > 0) {
      API.conflict(
        res,
        "Archivo válido con columnas adicionales no reconocidas",
        {
          mappedFields,
          unrecognizedColumns,
        }
      );
      return;
    }

    const rowsObjects = XlsxBody(data, mappedFields);
    const { valid, errors } = validateRows(rowsObjects, contentXlsxPreUnidad);

    if (errors.length > 0) {
      API.conflict(res, "Errores en algunas filas", { errors });
      return;
    }
    console.log(valid);
    API.success(res, "Header válido", {
      mappedFields,
    });
  } catch (error) {
    API.serverError(
      res,
      "Error al procesar el archivo",
      error instanceof Error ? error.message : "Error desconocido"
    );
  }
};

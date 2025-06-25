import { contentXlsxPreUnidad } from "../validations/v_upload";
import { XlsxBody } from "@/infraestructure/lib/xlsx/xlsx.config";
import { validateRows } from "@/infraestructure/lib/xlsx/xlsx.valid.rows";
import { validateXlsxHeader } from "@/infraestructure/validations/v_PresupuestoUnidad";

export const getdataXlsxService = (data: any[][]) => {
  if (data.length === 0) {
    throw new Error("El archivo está vacío");
  }

  const rawHeader = data[0];
  const stringHeader = rawHeader.map((cell) => String(cell ?? "").trim());

  const { mappedFields, missingFields, unrecognizedColumns } =
    validateXlsxHeader(stringHeader);

  if (missingFields.length > 0) {
    return {
      success: false,
      type: "MISSING_COLUMNS" as const,
      data: { missingFields, unrecognizedColumns },
    };
  }

  if (unrecognizedColumns.length > 0) {
    return {
      success: false,
      type: "UNRECOGNIZED_COLUMNS" as const,
      data: { mappedFields, unrecognizedColumns },
    };
  }

  const rowsObjects = XlsxBody(data, mappedFields);
  const { valid, errors } = validateRows(rowsObjects, contentXlsxPreUnidad);

  if (errors.length > 0) {
    const formattedErrors = errors.map(({ row, error }) => ({
      row,
      issues: error.issues.map(({ path, message, code }) => ({
        path,
        message,
        code,
      })),
    }));
    console.log(JSON.stringify(formattedErrors, null, 2));

    return {
      success: false,
      type: "ROW_ERRORS" as const,
      data: { errors: formattedErrors },
    };
  }

  return {
    success: true,
    data: {
      mappedFields,
      valid,
    },
  };
};

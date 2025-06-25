import { contentXlsxPreUnidad } from "@/modules/presupuestos/validations/v_upload";
import { mapXlsxHeader } from "../lib/xlsx/xlsx.config";

const headerMap: Record<string, string> = {
  DA: "DA",
  UE: "UE",
  "Cat. Prg.": "CatPrg",
  FTE: "FTE",
  "Org.": "Org",
  Objeto: "Objeto",
  "Descripcion Objeto Del Gasto": "Descripcion",
  "Presup. Vig.": "PresupVig",
  Devengado: "Devengado",
  "Porcen.": "Porcen",
};

export function validateXlsxHeader(rawHeader: string[]) {
  const { mappedFields, unrecognizedColumns } = mapXlsxHeader(
    rawHeader,
    headerMap
  );

  const requiredFields = Object.keys(contentXlsxPreUnidad.shape);
  const missingFields = requiredFields.filter(
    (field) => !mappedFields.includes(field)
  );

  return {
    mappedFields,
    missingFields,
    unrecognizedColumns,
  };
}

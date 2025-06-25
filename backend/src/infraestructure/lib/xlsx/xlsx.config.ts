import * as XLSX from "xlsx";
import { XlsxCell, XlsxData } from "./xlsx.types";

export function readXlsx(buffer: Buffer): XlsxData {
  const workbook = XLSX.read(buffer, { type: "buffer" });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

  if (!Array.isArray(data) || !data.every((row) => Array.isArray(row))) {
    throw new Error("Formato inesperado en el archivo XLSX");
  }

  return data as XlsxData;
}

export function mapXlsxHeader(
  rawHeader: XlsxCell[],
  headerMap: Record<string, string>
): {
  mappedFields: string[];
  unrecognizedColumns: string[];
} {
  const stringHeader = rawHeader.map((cell) => String(cell || "").trim());

  const mapped = stringHeader.map((col) => headerMap[col] || null);

  return {
    mappedFields: mapped.filter((f): f is string => f !== null),
    unrecognizedColumns: stringHeader.filter((_, i) => mapped[i] === null),
  };
}

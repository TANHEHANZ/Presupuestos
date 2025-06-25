import { Decimal } from "@prisma/client/runtime/library";

export const parseDecimal = (value: unknown): Decimal => {
  if (typeof value !== "string" && typeof value !== "number") {
    throw new Error(`Tipo no soportado: ${typeof value}`);
  }

  const clean = String(value).replace(/\./g, "").replace(/,/g, ".");
  const num = new Decimal(clean);

  if (num.isNaN()) {
    throw new Error(`Valor no numérico detectado: "${value}"`);
  }
  return num.toDecimalPlaces(2);
};

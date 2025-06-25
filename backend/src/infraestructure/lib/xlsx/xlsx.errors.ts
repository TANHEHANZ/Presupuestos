import { Response } from "express";
import { API } from "@/infraestructure/config/response";

export function handleXlsxError(
  res: Response,
  message: string,
  details?: any
): void {
  API.conflict(res, message, details);
}

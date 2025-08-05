import { Request, Response } from "express";
import { Ln_service } from "../services/ln_service";
import { API } from "@/infraestructure/config/response";
export const lnController = {
  login: async (req: Request, res: Response): Promise<void> => {
    try {
      const { accessToken, refreshToken } = await Ln_service.login(req.body);
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 15 * 60 * 1000,
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      API.success(res, "Inicio de sesión exitoso");
    } catch (err) {
      console.log(err);
      API.badRequest(res, "Error al iniciar sesión", err);
    }
  },

  refresh: async (req: Request, res: Response): Promise<void> => {
    try {
      const refreshToken = req.cookies.refreshToken;
      console.log(refreshToken);
      if (!refreshToken) {
        API.unauthorized(res, "No se proporcionó el token de actualización");
        return;
      }

      const newAccessToken = await Ln_service.refresh(refreshToken);

      res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 3 * 60 * 60 * 1000,
      });

      API.success(res, "Nuevo token generado correctamente");
    } catch (err) {
      API.unauthorized(res, (err as Error).message);
    }
  },

  logout: async (req: Request, res: Response): Promise<void> => {
    try {
      res.clearCookie("accessToken", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
      });

      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
      });

      API.success(res, "Sesión cerrada correctamente");
    } catch (err) {
      API.serverError(res, "Error al cerrar sesión");
    }
  },
};

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
};

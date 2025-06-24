import bcrypt from "bcryptjs";
import { prismaC } from "@/infraestructure/config/prisma.client";
import { DTO_lnCredentials } from "../validations/credentials";
import {
  decryptPayload,
  encryptPayload,
} from "@/infraestructure/middleware/crypto";
interface R_login {
  accessToken: string;
  refreshToken: string;
}
export const Ln_service = {
  login: async ({ ci, password }: DTO_lnCredentials): Promise<R_login> => {
    const user = await prismaC.user.findUnique({
      where: { ci },
    });
    if (!user) {
      throw new Error(
        "Credenciales inválidas. Por favor, verifica tu cédula o contraseña."
      );
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new Error("Contraseña incorrecta.");
    }
    const payloadAccess = { id: user.id, exp: Date.now() + 15 * 60 * 1000 };
    const { encryptedData: encryptedAccess, iv: ivAccess } =
      encryptPayload(payloadAccess);
    const accessToken = `${ivAccess}.${encryptedAccess}`;

    const payloadRefresh = {
      id: user.id,
      exp: Date.now() + 7 * 24 * 60 * 60 * 1000,
    };
    const { encryptedData: encryptedRefresh, iv: ivRefresh } =
      encryptPayload(payloadRefresh);
    const refreshToken = `${ivRefresh}.${encryptedRefresh}`;

    return { accessToken, refreshToken };
  },
  refresh: async (token: string): Promise<string> => {
    const parts = token.split(".");
    if (parts.length !== 3) {
      throw new Error("Token de refresh inválido o manipulado");
    }
    const [iv, encryptedData, authTag] = parts;

    const payload: any = decryptPayload(`${encryptedData}.${authTag}`, iv);

    if (!payload.exp || Date.now() > payload.exp) {
      throw new Error("Token de refresh expirado");
    }

    const newPayload = {
      id: payload.id,
      exp: Date.now() + 3 * 60 * 60 * 1000,
    };

    const { encryptedData: newEncrypted, iv: newIv } =
      encryptPayload(newPayload);
    const newAccessToken = `${newIv}.${newEncrypted}`;

    return newAccessToken;
  },
};

import bcrypt from "bcryptjs";
import { prismaC } from "@/infraestructure/config/prisma.client";
import { DTO_lnCredentials } from "../validations/credentials";
import { encryptPayload } from "@/infraestructure/middleware/crypto";
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
      throw new Error("Usuario no encontrado.");
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
};

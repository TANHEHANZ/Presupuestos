import config from "@/infraestructure/config/config";
import { DTO_uCreate } from "../validations/v_create";
import { DTO_uValidate } from "../validations/v_uValidate";
import { prismaC } from "@/infraestructure/config/prisma.client";
import {
  NotFoundError,
  ValidationError,
} from "@/infraestructure/helpers/error";
import { UserApiResponse } from "../types/t_Uvalid";
import { User } from "@prisma/client";

export const Uservice = {
  uValidate: async ({ ci }: DTO_uValidate): Promise<any> => {
    try {
      const existingUser = await prismaC.user.findFirst({ where: { ci } });

      if (existingUser) {
        throw new NotFoundError("El usuario ya se registró.");
      }
      const formData = new URLSearchParams();
      formData.append("tipo", "D");
      formData.append("dato", ci);

      const response = await fetch(config.sr_user, {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.log(errorData);
        throw new ValidationError(`Servicio caído, contacta con soporte`);
      }

      const data: UserApiResponse = await response.json();

      if (!data.status) {
        throw new ValidationError(data.data as string);
      }

      return data.data;
    } catch (error: any) {
      console.error("Error en uValidate:", error.message || error);
      if (error instanceof ValidationError || error instanceof NotFoundError) {
        throw error;
      }
      throw new Error("No se pudo validar el usuario. Intenta nuevamente.");
    }
  },
  create: async (data: DTO_uCreate): Promise<User> => {
    const { permisos, ...userData } = data;
    try {
      await Uservice.uValidate({ ci: userData.ci });
    } catch (error) {
      if (error instanceof NotFoundError || error instanceof ValidationError) {
        throw error;
      }
      throw new Error("No se pudo validar el usuario.");
    }

    try {
      const result: User = await prismaC.$transaction(
        async (prisma): Promise<User> => {
          const newUser = await prisma.user.create({
            data: {
              ...userData,
              password: userData.ci,
              permisos,
            },
            include: {
              unidadEjecutora: true,
            },
          });

          return newUser;
        }
      );
      return result;
    } catch (error) {
      console.error("Error interno:", error);
      throw new Error("Error interno al crear el usuario");
    }
  },

  update: async (data: DTO_uCreate): Promise<void> => {},
};

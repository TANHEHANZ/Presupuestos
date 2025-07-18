import config from "@/infraestructure/config/config";
import { DTO_uCreate } from "../validations/v_create";
import { DTO_uValidate, DTO_uValidateR } from "../validations/v_uValidate";
import { prismaC } from "@/infraestructure/config/prisma.client";
import {
  NotFoundError,
  ValidationError,
} from "@/infraestructure/helpers/error";
import { PropChangePassword, UserApiResponse } from "../types/t_Uvalid";
import { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { PERMISSION } from "@/infraestructure/constants";
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

      const responseApi = data.data as DTO_uValidateR[];
      return {
        ci: responseApi[0].ci,
        name: responseApi[0].empleado,
      };
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
    const hashedPassword = await bcrypt.hash(userData.ci, Number(config.SALT));

    try {
      const result: User = await prismaC.$transaction(
        async (prisma): Promise<User> => {
          const newUser = await prisma.user.create({
            data: {
              ...userData,
              password: hashedPassword,
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

  changePassword: async ({
    change,
    idUser,
  }: PropChangePassword): Promise<any> => {
    if (!change.confirmChange) {
      throw new Error("No confirmaste el cambio de contraseña");
    }

    const user = await prismaC.user.findUnique({
      where: { id: idUser },
    });

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    const isCurrentPasswordValid = await bcrypt.compare(
      change.password,
      user.password
    );
    if (!isCurrentPasswordValid) {
      throw new Error("Contraseña actual incorrecta");
    }
    const hashedPassword = await bcrypt.hash(
      change.newPassword,
      Number(config.SALT)
    );
    await prismaC.user.update({
      where: { id: idUser },
      data: {
        password: hashedPassword,
      },
    });
  },
  all: async (): Promise<any[]> => {
    const users = await prismaC.user.findMany({
      include: {
        unidadEjecutora: true,
      },
    });

    const mapPermKeysWithGroups = (userKeys: string[]) => {
      return PERMISSION.map((group) => {
        const matchingPerms = group.permissions.filter((perm) =>
          userKeys.includes(perm.key)
        );

        if (matchingPerms.length === 0) return null;

        return {
          group: group.group,
          color: group.color,
          icon: group.icon,
          permissions: matchingPerms,
        };
      }).filter((g) => g !== null);
    };

    return users.map((user) => ({
      id: user.id,
      ci: user.ci,
      name: user.name,
      rol: user.rol,
      estado: user.estado,
      unidadEjecutora: user.unidadEjecutora,
      permisos: mapPermKeysWithGroups(user.permisos),
    }));
  },
  update: async (data: DTO_uCreate): Promise<User> => {
    if (!data.idUser) {
      throw new Error("El ID del usuario es requerido para actualizar");
    }
    const user = await prismaC.user.findUnique({
      where: { id: data.idUser },
    });

    if (!user) {
      throw new NotFoundError("El usuario no existe");
    }

    try {
      const updatedUser = await prismaC.user.update({
        where: { id: data.idUser },
        data: {
          name: data.name,
          rol: data.rol,
          estado: data.estado,
          permisos: data.permisos,
          unidadId: data.unidadId,
        },
        include: {
          unidadEjecutora: true,
        },
      });

      return updatedUser;
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      throw new Error("Error interno al actualizar el usuario");
    }
  },
};

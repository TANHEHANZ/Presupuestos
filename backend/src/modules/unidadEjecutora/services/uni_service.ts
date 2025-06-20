import { prismaC } from "@/infraestructure/config/prisma.client";
import { DTO_uniCreate } from "../validations/v_create";
import { UnidadEjecutora } from "@prisma/client";
export const Uni_service = {
  all: async (): Promise<Partial<UnidadEjecutora>[]> => {
    try {
      const uni_all = await prismaC.unidadEjecutora.findMany({
        where: { estado: "ACTIVO" },
        omit: {
          createdAt: true,
          updatedAt: true,
        },
      });
      return uni_all;
    } catch (error) {
      throw new Error("Error al obtener las Unidades Ejecutoras: " + error);
    }
  },

  info: async (id: string): Promise<UnidadEjecutora | null> => {
    return await prismaC.unidadEjecutora.findUnique({ where: { id } });
  },

  update: async (
    id: string,
    data: Partial<DTO_uniCreate>
  ): Promise<UnidadEjecutora> => {
    return await prismaC.unidadEjecutora.update({
      where: { id },
      data,
    });
  },

  delete: async (id: string): Promise<UnidadEjecutora> => {
    return await prismaC.unidadEjecutora.update({
      where: { id },
      data: { estado: "INACTIVO" },
    });
  },

  create: async (data: DTO_uniCreate): Promise<UnidadEjecutora> => {
    return await prismaC.unidadEjecutora.create({
      data,
    });
  },
};

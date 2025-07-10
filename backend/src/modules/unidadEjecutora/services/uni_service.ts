import { prismaC } from "@/infraestructure/config/prisma.client";
import { DTO_uniCreate } from "../validations/v_create";
import { UnidadEjecutora } from "@prisma/client";
import { paginate } from "@/infraestructure/config/paginate";
interface FiltersProps {
  ue?: string;
  secretaria?: string;
  page: number;
  limit: number;
}

export const Uni_service = {
  all: async ({ ue, secretaria, page, limit }: FiltersProps): Promise<any> => {
    try {
      const where = {
        estado: "ACTIVO",
        ...(ue && {
          ue: {
            contains: ue,
            mode: "insensitive",
          },
        }),
        ...(secretaria && {
          secretaria: {
            contains: secretaria,
            mode: "insensitive",
          },
        }),
      };
      const uni_all = await paginate<UnidadEjecutora>(prismaC.unidadEjecutora, {
        where,
        page: Number(page),
        limit: Number(limit),
        orderBy: { createdAt: "desc" },
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
    data: Partial<DTO_uniCreate> & { id: string }
  ): Promise<UnidadEjecutora> => {
    const validateExisting = await prismaC.unidadEjecutora.findUnique({
      where: {
        ue: data.ue,
      },
    });
    if (validateExisting) {
      throw new Error("Ya existe una unidad ejecutora con esta UE:" + data.ue);
    }

    return await prismaC.unidadEjecutora.update({
      where: { id: data.id },
      data: {
        ...data,
        id: undefined,
      },
    });
  },

  delete: async ({ id }: { id: string }): Promise<UnidadEjecutora> => {
    return await prismaC.unidadEjecutora.update({
      where: { id },
      data: { estado: "INACTIVO" },
    });
  },

  create: async (data: DTO_uniCreate): Promise<UnidadEjecutora> => {
    const validateExisting = await prismaC.unidadEjecutora.findUnique({
      where: {
        ue: data.ue,
      },
    });
    if (validateExisting) {
      throw new Error("Ya existe una unidad ejecutora con esta UE:" + data.ue);
    }
    return await prismaC.unidadEjecutora.create({
      data,
    });
  },
};

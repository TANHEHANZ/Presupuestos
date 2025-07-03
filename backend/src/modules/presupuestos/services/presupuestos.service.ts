import { paginate } from "@/infraestructure/config/paginate";
import { prismaC } from "@/infraestructure/config/prisma.client";
import { Presupuesto, UnidadEjecutora } from "@prisma/client";

interface FiltersProps {
  page: string;
  limit: string;
  descripcion?: string;
  org?: string;
  objeto?: string;
  descripcionGasto?: string;
}

export const ProyectService = {
  list: async ({
    descripcion,
    descripcionGasto,
    objeto,
    org,
    page,
    limit,
  }: FiltersProps) => {
    const where = {
      estado: {
        in: ["ACTIVO", "RECUPERADO"],
      },
      ...(org && {
        org: Number(org),
      }),
      ...(objeto && {
        objetoGasto: {
          contains: objeto,
          mode: "insensitive",
        },
      }),
      ...(descripcionGasto && {
        descrpcionObjetoGasto: {
          contains: descripcionGasto,
          mode: "insensitive",
        },
      }),
      unidadEjecutora: descripcion
        ? {
            descripcion: {
              contains: descripcion,
              mode: "insensitive",
            },
          }
        : undefined,
    };

    const result = await paginate<
      Presupuesto & { unidadEjecutora: UnidadEjecutora | null }
    >(prismaC.presupuesto, {
      page: Number(page),
      limit: Number(limit),
      where,
      include: {
        unidadEjecutora: true,
      },
      orderBy: { createdAt: "desc" },
    });

    const data = result.data.map((p) => ({
      id: p.id,
      mes: p.mes,
      ue: p.ue,
      org: p.org,
      objetoGasto: p.objetoGasto,
      descripcionGasto: p.descrpcionObjetoGasto,
      presupuestoVigente: p.presupuestoVigente,
      devengado: p.devengado,
      porcentajeEjecucion: p.porcentajeEjecucion,
      unidad: p.unidadEjecutora?.descripcion,
    }));

    return {
      data,
      totalPages: result.totalPages,
      currentPage: result.currentPage,
      totalItems: result.totalItems,
    };
  },
};

import { prismaC } from "@/infraestructure/config/prisma.client";

interface FiltersProps {
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
  }: FiltersProps): Promise<any> => {
    const presupuestos = await prismaC.presupuesto.findMany({
      where: {
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
      },
      include: {
        unidadEjecutora: true,
      },
    });

    return presupuestos.map((p) => ({
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
  },
};

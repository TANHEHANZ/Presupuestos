import { prismaC } from "@/infraestructure/config/prisma.client";
import { DTO_consultaParams } from "../validations/v_consulta";
import { Prisma } from "@prisma/client";
import { paginate } from "@/infraestructure/config/paginate";

export const FilterService = async (params: DTO_consultaParams) => {
  const where: Prisma.PresupuestoWhereInput = {
    estado: "ACTIVO",

    ...(params.da && {
      da: Number(params.da),
    }),
    ...(params.fte !== undefined && {
      fte: Number(params.fte),
    }),

    ...(params.descripcionGasto && {
      descrpcionObjetoGasto: {
        contains: params.descripcionGasto,
        mode: "insensitive",
      },
    }),
    ...(params.objetoGasto && {
      objetoGasto: {
        contains: params.objetoGasto,
        mode: "insensitive",
      },
    }),
  };

  if (params.ueDesde !== undefined || params.ueHasta !== undefined) {
    where.ue = {};
    if (params.ueDesde !== undefined) where.ue.gte = Number(params.ueDesde);
    if (params.ueHasta !== undefined) where.ue.lte = Number(params.ueHasta);
  }

  if (params.orgDesde !== undefined || params.orgHasta !== undefined) {
    where.org = {};
    if (params.orgDesde !== undefined) where.org.gte = Number(params.orgDesde);
    if (params.orgHasta !== undefined) where.org.lte = Number(params.orgHasta);
  }

  if (params.catProg) {
    where.catPrg = {
      contains: params.catProg,
      mode: "insensitive",
    };
  }

  if (params.descripcion) {
    where.unidadEjecutora = {
      descripcion: {
        contains: params.descripcion,
        mode: "insensitive",
      },
    };
  }

  if (params.presupuestoVigenteComparar !== undefined && params.operador) {
    switch (params.operador) {
      case "IGUAL":
        where.presupuestoVigente = Number(params.presupuestoVigenteComparar);
        break;
      case "MAYOR_QUE":
        where.presupuestoVigente = {
          gt: Number(params.presupuestoVigenteComparar),
        };
        break;
      case "MENOR_QUE":
        where.presupuestoVigente = {
          lt: Number(params.presupuestoVigenteComparar),
        };
        break;
    }
  }
  if (params.periodo && typeof params.periodo === "string") {
    params.periodo = params.periodo.split(",").map((str) => str.trim());
  }

  if (Array.isArray(params.periodo) && params.periodo.length === 2) {
    where.mes = {
      gte: new Date(params.periodo[0]),
      lte: new Date(params.periodo[1]),
    };
  }
  const result = await paginate<
    Prisma.PresupuestoGetPayload<{ include: { unidadEjecutora: true } }>
  >(prismaC.presupuesto, {
    page: params.page,
    limit: params.limit,
    where,
    select: {
      mes: true,
      da: true,
      ue: true,
      catPrg: true,
      fte: true,
      org: true,
      objetoGasto: true,
      presupuestoVigente: true,
      descrpcionObjetoGasto: true,
      devengado: true,
      unidadEjecutora: {
        select: {
          ue: true,
          secretaria: true,
          descripcion: true,
        },
      },
    },
    orderBy: {
      mes: "desc",
    },
  });
  const enrichedData = await Promise.all(
    result.data.map(async (item) => {
      const programacion = await prismaC.programacion.findMany({
        where: {
          estado: "ACTIVO",
          codigoObjetoGasto: item.codigoObjetoGasto,
        },
        select: {
          value: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      const totalProgramacion = programacion.reduce(
        (acc, curr) => acc + curr.value,
        0
      );

      return {
        ...item,
        totalProgramacion,
      };
    })
  );

  return {
    ...result,
    data: enrichedData,
  };
};

import { prismaC } from "@/infraestructure/config/prisma.client";

interface FiltersProps {
  ue?: string;
  descripcionUe?: string;
}

export const PreUnidadService = {
  list: async ({ ue, descripcionUe }: FiltersProps): Promise<any> => {
    const whereClauses = [];
    const params: any[] = [];

    if (ue) {
      whereClauses.push(`ue."ue" = $${params.length + 1}`);
      params.push(ue);
    }

    if (descripcionUe) {
      whereClauses.push(`ue."descripcion" ILIKE $${params.length + 1}`);
      params.push(`%${descripcionUe}%`);
    }

    const whereSQL = whereClauses.length
      ? `WHERE ${whereClauses.join(" AND ")}`
      : "";

    const result = await prismaC.$queryRawUnsafe(
      `
      SELECT
        ue."ue" AS "ue",
        ue."descripcion" AS "descripcion",
        COALESCE(SUM(p."presupuestoVigente"), 0) AS "montoVigente",
        COALESCE(SUM(CAST(pr."Programado" AS NUMERIC)), 0) AS "montoProgramado"
      FROM "UnidadEjecutora" ue
      LEFT JOIN "Presupuesto" p
        ON ue."id" = p."unidadId" AND p."estado" = 'ACTIVO'
      LEFT JOIN "Programacion" pr
        ON p."id" = pr."presupuestoId" AND pr."estado" = 'ACTIVO'
      ${whereSQL}
      GROUP BY ue."ue", ue."descripcion"
      ORDER BY ue."ue"
      `,
      ...params
    );

    return result;
  },

  listUEgrup: async ({ ue, descripcionUe }: FiltersProps): Promise<any> => {
    // debemos manejar el monto total del presupuesto vigente , hacer una sumatoria de de lo que programen

    const unidades = await prismaC.unidadEjecutora.findMany({
      where: {
        ...(ue && { ue }),
        ...(descripcionUe && {
          descripcion: {
            contains: descripcionUe,
            mode: "insensitive",
          },
        }),
      },
      include: {
        presupuestos: {
          where: {
            estado: "ACTIVO",
          },
        },
      },
    });

    return unidades.map((unidad) => ({
      ue: unidad.ue,
      descripcion: unidad.descripcion,
      presupuestos: unidad.presupuestos,
    }));
  },
};

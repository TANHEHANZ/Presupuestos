import { prismaC } from "@/infraestructure/config/prisma.client";

interface FiltersProps {
  ue?: string;
  descripcionUe?: string;
  page?: number;
  limit?: number;
}

export const PreUnidadService = {
  list: async ({
    ue,
    descripcionUe,
    page = 1,
    limit = 10,
  }: FiltersProps): Promise<{
    data: any[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
  }> => {
    const whereClauses = [];
    const params: any[] = [];
    let paramIndex = 1;

    if (ue) {
      whereClauses.push(`ue."ue" = $${paramIndex++}`);
      params.push(ue);
    }

    if (descripcionUe) {
      whereClauses.push(`ue."descripcion" ILIKE $${paramIndex++}`);
      params.push(`%${descripcionUe}%`);
    }

    const whereSQL = whereClauses.length
      ? `WHERE ${whereClauses.join(" AND ")}`
      : "";

    const countResult = await prismaC.$queryRawUnsafe<{ count: number }[]>(
      `
      SELECT COUNT(*)::int AS count
      FROM (
        SELECT ue."ue"
        FROM "UnidadEjecutora" ue
        LEFT JOIN "Presupuesto" p ON ue."id" = p."unidadId" AND p."estado" = 'ACTIVO'
        LEFT JOIN "Programacion" pg ON pg."codigoObjetoGasto" = p."codigoObjetoGasto" AND pg."estado" = 'ACTIVO'
        ${whereSQL}
        GROUP BY ue."ue", ue."descripcion"
      ) AS sub
      `,
      ...params
    );

    const totalItems = countResult[0]?.count ?? 0;
    const totalPages = Math.ceil(totalItems / limit);
    const offset = (page - 1) * limit;

    // 👉 Consulta paginada
    const data = (await prismaC.$queryRawUnsafe(
      `
      SELECT
        ue."ue" AS "ue",
        ue."descripcion" AS "descripcion",
        COALESCE(SUM(p."presupuestoVigente"), 0) AS "montoVigente",
        COALESCE(SUM(pg."value"), 0) AS "montoProgramado"
      FROM "UnidadEjecutora" ue
      LEFT JOIN "Presupuesto" p
        ON ue."id" = p."unidadId" AND p."estado" = 'ACTIVO'
      LEFT JOIN "Programacion" pg
        ON pg."codigoObjetoGasto" = p."codigoObjetoGasto" AND pg."estado" = 'ACTIVO'
      ${whereSQL}
      GROUP BY ue."ue", ue."descripcion"
      ORDER BY ue."ue"
      LIMIT ${limit}
      OFFSET ${offset}
      `,
      ...params
    )) as any;

    return {
      data,
      totalItems,
      totalPages,
      currentPage: page,
    };
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

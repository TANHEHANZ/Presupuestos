"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreUnidadService = void 0;
const prisma_client_1 = require("../../../infraestructure/config/prisma.client");
exports.PreUnidadService = {
    list: async ({ ue, descripcionUe, page = 1, limit = 10, }) => {
        const whereClauses = [];
        const params = [];
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
        const countResult = await prisma_client_1.prismaC.$queryRawUnsafe(`
      SELECT COUNT(*)::int AS count
      FROM (
        SELECT ue."ue"
        FROM "UnidadEjecutora" ue
        LEFT JOIN "Presupuesto" p ON ue."id" = p."unidadId" AND p."estado" = 'ACTIVO'
        LEFT JOIN "Programacion" pg ON pg."codigoObjetoGasto" = p."codigoObjetoGasto" AND pg."estado" = 'ACTIVO'
        ${whereSQL}
        GROUP BY ue."ue", ue."descripcion"
      ) AS sub
      `, ...params);
        const totalItems = countResult[0]?.count ?? 0;
        const totalPages = Math.ceil(totalItems / limit);
        const offset = (page - 1) * limit;
        // 👉 Consulta paginada
        const data = (await prisma_client_1.prismaC.$queryRawUnsafe(`
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
      `, ...params));
        return {
            data,
            totalItems,
            totalPages,
            currentPage: page,
        };
    },
    listUEgrup: async ({ ue, descripcionUe }) => {
        // debemos manejar el monto total del presupuesto vigente , hacer una sumatoria de de lo que programen
        const unidades = await prisma_client_1.prismaC.unidadEjecutora.findMany({
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

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterService = void 0;
const prisma_client_1 = require("../../../infraestructure/config/prisma.client");
const paginate_1 = require("../../../infraestructure/config/paginate");
const FilterService = async (params) => {
    const where = {
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
    if (params.tipoGasto === "FUNCIONAMIENTO") {
        where.OR = [
            { catPrg: { startsWith: "000" } },
            { catPrg: { startsWith: " 000" } },
        ];
    }
    if (params.tipoGasto === "ELEGIBLES") {
        where.AND = [
            {
                NOT: [
                    { catPrg: { startsWith: "000" } },
                    { catPrg: { startsWith: " 000" } },
                ],
            },
        ];
    }
    if (params.ueDesde !== undefined || params.ueHasta !== undefined) {
        where.ue = {};
        if (params.ueDesde !== undefined)
            where.ue.gte = Number(params.ueDesde);
        if (params.ueHasta !== undefined)
            where.ue.lte = Number(params.ueHasta);
    }
    if (params.orgDesde !== undefined || params.orgHasta !== undefined) {
        where.org = {};
        if (params.orgDesde !== undefined)
            where.org.gte = Number(params.orgDesde);
        if (params.orgHasta !== undefined)
            where.org.lte = Number(params.orgHasta);
    }
    if (params.catProgDesde !== undefined || params.catProgHasta !== undefined) {
        const catPrgFilter = {};
        if (params.catProgDesde !== undefined) {
            catPrgFilter.gte = params.catProgDesde;
        }
        if (params.catProgHasta !== undefined) {
            catPrgFilter.lte = params.catProgHasta;
        }
        where.catPrg = catPrgFilter;
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
    const result = await (0, paginate_1.paginate)(prisma_client_1.prismaC.presupuesto, {
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
    const enrichedData = await Promise.all(result.data.map(async (item) => {
        const programacion = await prisma_client_1.prismaC.programacion.findMany({
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
        const totalProgramacion = programacion.reduce((acc, curr) => acc + curr.value, 0);
        return {
            ...item,
            totalProgramacion,
        };
    }));
    return {
        ...result,
        data: enrichedData,
    };
};
exports.FilterService = FilterService;

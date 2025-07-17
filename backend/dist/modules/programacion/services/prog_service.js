"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Prog_service = void 0;
const prisma_client_1 = require("../../../infraestructure/config/prisma.client");
const paginate_1 = require("../../../infraestructure/config/paginate");
const mesesOrdenados = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
];
exports.Prog_service = {
    create: async (data, idUserCreate) => {
        const presupuesto = await prisma_client_1.prismaC.presupuesto.findUnique({
            where: { id: data.idPresupuesto },
            select: {
                id: true,
                codigoObjetoGasto: true,
                mes: true,
                presupuestoVigente: true,
            },
        });
        if (!presupuesto) {
            throw new Error("Presupuesto no encontrado");
        }
        const LIMIT_PRESUPUESTO = presupuesto.presupuestoVigente;
        const totalProgramado = data.programacion.reduce((sum, prog) => sum + (prog.value || 0), 0);
        if (LIMIT_PRESUPUESTO < totalProgramado) {
            throw new Error(`El total programado (${totalProgramado}) supera el presupuesto vigente (${LIMIT_PRESUPUESTO})`);
        }
        for (const prog of data.programacion) {
            const existe = await prisma_client_1.prismaC.programacion.findFirst({
                where: {
                    codigoObjetoGasto: presupuesto.codigoObjetoGasto,
                    mes: prog.mes,
                },
            });
            if (existe) {
                const historial = await prisma_client_1.prismaC.historial.create({
                    data: {
                        accion: "MODIFICACION_VALOR",
                        table: "Programacion",
                        detalle: `Actualización de programación mensual para mes: ${prog.mes}`,
                        old_data: {
                            ...existe,
                            estado: " HISTORICO",
                        },
                        new_data: {
                            value: prog.value,
                            version: existe.version + 1,
                            updatedAt: new Date(),
                            userId: idUserCreate,
                            mes: prog.mes,
                            codigoObjetoGasto: presupuesto.codigoObjetoGasto,
                        },
                        fecha: new Date(),
                        usuarioId: idUserCreate,
                    },
                });
                await prisma_client_1.prismaC.programacion.update({
                    where: { id: existe.id },
                    data: {
                        value: prog.value,
                        version: { increment: 1 },
                        updatedAt: new Date(),
                        userId: idUserCreate,
                        historialId: historial.id,
                    },
                });
            }
            else {
                const historial = await prisma_client_1.prismaC.historial.create({
                    data: {
                        accion: "CREACION",
                        table: "Programacion",
                        detalle: `Creación de programación mensual para mes: ${prog.mes}`,
                        new_data: {
                            value: prog.value,
                            version: 1,
                            mes: prog.mes,
                            codigoObjetoGasto: presupuesto.codigoObjetoGasto,
                        },
                        fecha: new Date(),
                        usuarioId: idUserCreate,
                    },
                });
                await prisma_client_1.prismaC.programacion.create({
                    data: {
                        mes: prog.mes,
                        value: prog.value,
                        codigoObjetoGasto: presupuesto.codigoObjetoGasto,
                        version: 1,
                        userId: idUserCreate,
                        historialId: historial.id,
                    },
                });
            }
        }
        return {
            success: true,
            totalProgramado: totalProgramado,
            presupuesto: LIMIT_PRESUPUESTO,
            programaciones: data.programacion,
        };
    },
    list: async ({ descripcion, descripcionGasto, objeto, org, page, limit, idPresupuesto, }) => {
        try {
            const where = {
                estado: "ACTIVO",
                ...(idPresupuesto && {
                    id: idPresupuesto,
                }),
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
            const paginated = await (0, paginate_1.paginate)(prisma_client_1.prismaC.presupuesto, {
                page: Number(page),
                limit: Number(limit),
                where,
                include: {
                    unidadEjecutora: {
                        select: {
                            id: true,
                            ue: true,
                            secretaria: true,
                            descripcion: true,
                        },
                    },
                },
            });
            const config = await prisma_client_1.prismaC.configuracion.findFirst({
                where: {
                    key: "lastMonth",
                },
                select: {
                    key: true,
                    value: true,
                },
            });
            if (!config) {
                throw new Error("Configuración no encontrada");
            }
            const resultados = [];
            for (const presupuesto of paginated.data) {
                const programaciones = await prisma_client_1.prismaC.programacion.findMany({
                    where: {
                        codigoObjetoGasto: presupuesto.codigoObjetoGasto,
                        estado: "ACTIVO",
                    },
                    select: {
                        id: true,
                        mes: true,
                        value: true,
                        version: true,
                        updatedAt: true,
                        codigoObjetoGasto: true,
                        estado: true,
                    },
                    orderBy: {
                        mes: "asc",
                    },
                });
                const programacionMap = new Map(programaciones.map((prog) => [prog.mes, prog]));
                const programacionesCompletas = mesesOrdenados.map((mes) => {
                    const existente = programacionMap.get(mes);
                    return existente
                        ? existente
                        : {
                            id: null,
                            mes,
                            value: 0,
                            version: 1,
                            updatedAt: null,
                            codigoObjetoGasto: presupuesto.codigoObjetoGasto,
                            estado: "ACTIVO",
                        };
                });
                const totalProgramado = programacionesCompletas.reduce((sum, p) => sum + (typeof p.value === "number" ? p.value : 0), 0);
                resultados.push({
                    presupuesto: {
                        id: presupuesto.id,
                        codigoObjetoGasto: presupuesto.codigoObjetoGasto,
                        descripcion: presupuesto.descrpcionObjetoGasto,
                        mes: presupuesto.mes.toLocaleString("default", {
                            month: "long",
                        }),
                        fte: presupuesto.fte,
                        org: presupuesto.org,
                        CatPrg: presupuesto.catPrg,
                        objetoGasto: presupuesto.objetoGasto,
                        descripcionGasto: presupuesto.descrpcionObjetoGasto,
                        presupuestoVigente: presupuesto.presupuestoVigente,
                        presupuestoProgramado: totalProgramado,
                        unidadEjecutora: presupuesto.unidadEjecutora,
                        lastMonth: config.value,
                        currentMonth: new Date().toLocaleString("default", {
                            month: "long",
                        }),
                    },
                    programacion: programacionesCompletas,
                });
            }
            return {
                ...paginated,
                data: resultados,
            };
        }
        catch (error) {
            console.error("Error al listar la programación:", error);
            throw new Error("No se pudo obtener la programación");
        }
    },
};

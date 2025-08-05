"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProyectService = void 0;
const paginate_1 = require("../../../infraestructure/config/paginate");
const prisma_client_1 = require("../../../infraestructure/config/prisma.client");
exports.ProyectService = {
    list: async ({ descripcion, descripcionGasto, objeto, org, page, limit, }) => {
        const where = {
            estado: "ACTIVO",
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
        const result = await (0, paginate_1.paginate)(prisma_client_1.prismaC.presupuesto, {
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
            catPrg: p.catPrg,
            descripcion: p.unidadEjecutora?.descripcion,
            fte: p.fte,
            mes: p.mes,
            org: p.org,
            objetoGasto: p.objetoGasto, //objeto
            descripcionGasto: p.descrpcionObjetoGasto, //descripcion Objeto
            presupuestoVigente: p.presupuestoVigente, ////
        }));
        return {
            data,
            totalPages: result.totalPages,
            currentPage: result.currentPage,
            totalItems: result.totalItems,
        };
    },
    dataCalendar: async () => {
        const months = [
            "enero",
            "febrero",
            "marzo",
            "abril",
            "mayo",
            "junio",
            "julio",
            "agosto",
            "septiembre",
            "octubre",
            "noviembre",
            "diciembre",
        ];
        const programaciones = await prisma_client_1.prismaC.programacion.findMany({
            where: { estado: "ACTIVO" },
            select: { mes: true, value: true },
        });
        const monthValues = {};
        for (const item of programaciones) {
            const mes = item.mes.toLowerCase();
            if (!monthValues[mes])
                monthValues[mes] = 0;
            monthValues[mes] += item.value;
        }
        const meses = months.map((mes) => ({
            mes,
            value: monthValues[mes] ? monthValues[mes].toFixed(2) : "0.00",
        }));
        const TotalAsignado = Object.values(monthValues).reduce((sum, val) => sum + val, 0);
        const currentDate = new Date();
        const mesActual = months[currentDate.getMonth()];
        const asigado = TotalAsignado > 0;
        return {
            meses,
            mesActual,
            asigado,
            TotalAsignado,
        };
    },
};

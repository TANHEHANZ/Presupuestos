"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.savePresupuestoUnidades = void 0;
const prisma_client_1 = require("../../../infraestructure/config/prisma.client");
const error_1 = require("../../../infraestructure/helpers/error");
const savePresupuestoUnidades = async ({ userId, mes, valueXlsx, }) => {
    const firstDayOfMonth = new Date(mes.getFullYear(), mes.getMonth(), 1);
    const lastDayOfMonth = new Date(mes.getFullYear(), mes.getMonth() + 1, 0, 23, 59, 59, 999);
    console.log(firstDayOfMonth);
    console.log(lastDayOfMonth);
    const existPresupuestoMes = await prisma_client_1.prismaC.presupuesto.findFirst({
        where: {
            estado: "ACTIVO",
            mes: {
                gte: firstDayOfMonth,
                lte: lastDayOfMonth,
            },
        },
    });
    if (existPresupuestoMes) {
        throw new Error("Ya se realizo la carga de los registros en este mes.");
    }
    const archiveOld = prisma_client_1.prismaC.presupuesto.updateMany({
        where: {
            estado: "ACTIVO",
            mes: {
                gte: firstDayOfMonth,
                lte: lastDayOfMonth,
            },
        },
        data: {
            estado: "HISTORICO",
        },
    });
    console.log("old", archiveOld);
    const uniqueUeCodes = Array.from(new Set(valueXlsx.map((r) => r.UE.trim())));
    const unidades = await prisma_client_1.prismaC.unidadEjecutora.findMany({
        where: { ue: { in: uniqueUeCodes } },
        select: { id: true, ue: true },
    });
    const ueToId = Object.fromEntries(unidades.map((u) => [u.ue, u.id]));
    const records = valueXlsx.map((row) => {
        const unidadId = ueToId[row.UE.trim()];
        if (!unidadId) {
            throw new error_1.MissingUnidadError(row.UE.trim());
        }
        const codigoObjetoGasto = [
            row.DA,
            row.UE,
            row.CatPrg,
            row.FTE,
            row.Org,
            row.Objeto,
        ].join("-");
        return {
            mes,
            da: Number(row.DA),
            ue: Number(row.UE),
            catPrg: row.CatPrg,
            fte: Number(row.FTE),
            org: Number(row.Org),
            objetoGasto: row.Objeto,
            codigoObjetoGasto,
            presupuestoVigente: Number(parseFloat(row.PresupVig).toFixed(2)),
            devengado: Number(parseFloat(row.Devengado).toFixed(2)),
            porcentajeEjecucion: Number(parseFloat(row.Porcen).toFixed(2)),
            estado: "ACTIVO",
            descrpcionObjetoGasto: row.Descripcion,
            unidadId,
            creadoPorId: userId,
        };
    });
    const creates = records.map((r) => prisma_client_1.prismaC.presupuesto.create({
        data: r,
    }));
    const saved = await prisma_client_1.prismaC.$transaction([archiveOld, ...creates]);
    return saved;
};
exports.savePresupuestoUnidades = savePresupuestoUnidades;

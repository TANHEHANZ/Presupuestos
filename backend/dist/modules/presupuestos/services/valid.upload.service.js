"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validUploadPresupuestoService = void 0;
const prisma_client_1 = require("../../../infraestructure/config/prisma.client");
/**
 * Valida si ya existe un presupuesto ACTIVO para una unidad ejecutora en un mes específico.
 * @param unidadId ID de la unidad ejecutora.
 * @param mes Date correspondiente al mes (ej: primer día del mes).
 * @returns true si ya existe, false si no existe
 */
const validUploadPresupuestoService = async (unidadId, mes) => {
    const existingPresupuesto = await prisma_client_1.prismaC.presupuesto.findFirst({
        where: {
            unidadId,
            mes,
            estado: "ACTIVO",
        },
    });
    return {
        exists: existingPresupuesto !== null,
    };
};
exports.validUploadPresupuestoService = validUploadPresupuestoService;

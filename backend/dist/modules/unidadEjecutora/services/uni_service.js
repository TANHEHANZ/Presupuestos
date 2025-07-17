"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Uni_service = void 0;
const prisma_client_1 = require("../../../infraestructure/config/prisma.client");
const paginate_1 = require("../../../infraestructure/config/paginate");
exports.Uni_service = {
    all: async ({ ue, secretaria, page, limit }) => {
        try {
            const where = {
                estado: "ACTIVO",
                ...(ue && {
                    ue: {
                        contains: ue,
                        mode: "insensitive",
                    },
                }),
                ...(secretaria && {
                    secretaria: {
                        contains: secretaria,
                        mode: "insensitive",
                    },
                }),
            };
            const uni_all = await (0, paginate_1.paginate)(prisma_client_1.prismaC.unidadEjecutora, {
                where,
                page: Number(page),
                limit: Number(limit),
                orderBy: { createdAt: "desc" },
            });
            return uni_all;
        }
        catch (error) {
            throw new Error("Error al obtener las Unidades Ejecutoras: " + error);
        }
    },
    info: async (id) => {
        return await prisma_client_1.prismaC.unidadEjecutora.findUnique({ where: { id } });
    },
    update: async (data) => {
        const validateExisting = await prisma_client_1.prismaC.unidadEjecutora.findUnique({
            where: {
                ue: data.ue,
            },
        });
        if (validateExisting) {
            throw new Error("Ya existe una unidad ejecutora con esta UE:" + data.ue);
        }
        return await prisma_client_1.prismaC.unidadEjecutora.update({
            where: { id: data.id },
            data: {
                ...data,
                id: undefined,
            },
        });
    },
    delete: async ({ id }) => {
        return await prisma_client_1.prismaC.unidadEjecutora.update({
            where: { id },
            data: { estado: "INACTIVO" },
        });
    },
    create: async (data) => {
        const validateExisting = await prisma_client_1.prismaC.unidadEjecutora.findUnique({
            where: {
                ue: data.ue,
            },
        });
        if (validateExisting) {
            throw new Error("Ya existe una unidad ejecutora con esta UE:" + data.ue);
        }
        return await prisma_client_1.prismaC.unidadEjecutora.create({
            data,
        });
    },
};

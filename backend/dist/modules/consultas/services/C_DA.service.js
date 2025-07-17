"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DAService = void 0;
const prisma_client_1 = require("../../../infraestructure/config/prisma.client");
const DAService = async () => {
    try {
        const groupedDA = await prisma_client_1.prismaC.presupuesto.groupBy({
            by: ["da"],
            where: {
                estado: "ACTIVO",
            },
            orderBy: {
                da: "asc",
            },
        });
        return groupedDA.map((item) => ({
            value: item.da,
        }));
    }
    catch (error) {
        throw new Error(error instanceof Error ? error.message : String(error));
    }
};
exports.DAService = DAService;

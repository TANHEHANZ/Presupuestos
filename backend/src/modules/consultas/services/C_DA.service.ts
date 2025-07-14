import { prismaC } from "@/infraestructure/config/prisma.client";

interface DAresponse {
  value: number;
}

export const DAService = async (): Promise<DAresponse[]> => {
  try {
    const groupedDA = await prismaC.presupuesto.groupBy({
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
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};

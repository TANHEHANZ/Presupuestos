import { prismaC } from "@/infraestructure/config/prisma.client";

/**
 * Valida si ya existe un presupuesto ACTIVO para una unidad ejecutora en un mes específico.
 * @param unidadId ID de la unidad ejecutora.
 * @param mes Date correspondiente al mes (ej: primer día del mes).
 * @returns true si ya existe, false si no existe
 */
export const validUploadPresupuestoService = async (
  unidadId: string,
  mes: Date
): Promise<{ exists: boolean }> => {
  const existingPresupuesto = await prismaC.presupuesto.findFirst({
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

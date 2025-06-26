import { prismaC } from "@/infraestructure/config/prisma.client";
import { DTO_preUnidadSave } from "../validations/v_preUnidad";
import { MissingUnidadError } from "@/infraestructure/helpers/error";

interface ValueDataXlsx {
  DA: string;
  UE: string;
  CatPrg: string;
  FTE: string;
  Org: string;
  Objeto: string;
  Descripcion: string;
  PresupVig: string;
  Devengado: string;
  Porcen: string;
}

interface Props {
  userId: string;
  mes: Date;
  valueXlsx: ValueDataXlsx[];
}

export const savePresupuestoUnidades = async ({
  userId,
  mes,
  valueXlsx,
}: Props): Promise<any> => {
  const uniqueUeCodes = Array.from(new Set(valueXlsx.map((r) => r.UE.trim())));
  const unidades = await prismaC.unidadEjecutora.findMany({
    where: { ue: { in: uniqueUeCodes } },
    select: { id: true, ue: true },
  });
  const ueToId = Object.fromEntries(unidades.map((u) => [u.ue, u.id]));
  const records: DTO_preUnidadSave[] = valueXlsx.map((row) => {
    const unidadId = ueToId[row.UE.trim()];
    if (!unidadId) {
      throw new MissingUnidadError(row.UE.trim());
    }

    return {
      mes,
      da: Number(row.DA),
      ue: Number(row.UE),
      catPrg: row.CatPrg,
      fte: Number(row.FTE),
      org: Number(row.Org),
      objetoGasto: row.Objeto,
      codigoObjetoGasto: [
        row.DA,
        row.UE,
        row.CatPrg,
        row.FTE,
        row.Org,
        row.Objeto,
      ].join("-"),
      presupuestoVigente: Number(parseFloat(row.PresupVig).toFixed(2)),
      devengado: Number(parseFloat(row.Devengado).toFixed(2)),
      porcentajeEjecucion: Number(parseFloat(row.Porcen).toFixed(2)),

      estado: "ACTIVO",
      descrpcionObjetoGasto: row.Descripcion,
      unidadId,
      creadoPorId: userId,
    };
  });
  const saved = await prismaC.$transaction(
    records.map((r) =>
      prismaC.presupuesto.create({
        data: r,
      })
    )
  );

  return saved;
};

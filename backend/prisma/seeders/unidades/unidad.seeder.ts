import { PrismaClient } from "@prisma/client";
import * as xlsx from "xlsx";
import path from "path";
interface UnidadRow {
  "U.E.": string;
  Secretaria: string;
  Descripcion?: string;
}

const prisma = new PrismaClient();

export async function seederUnidad() {
  try {
    console.log("Starting UnidadEjecutora seeding...");

    const filePath = path.join(__dirname, "unidades.xls");

    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const data = xlsx.utils.sheet_to_json<UnidadRow>(
      workbook.Sheets[sheetName],
      {
        header: ["Secretaria", "U.E.", "Descripcion"],
        range: 1,
      }
    );

    for (const row of data) {
      const ue = row["U.E."]?.toString().trim();
      const secretaria = row["Secretaria"]?.toString().trim();
      const descripcion = row["Descripcion"]?.toString().trim() || null;

      if (!ue || !secretaria) {
        console.warn("Fila inválida o incompleta:", row);
        continue;
      }

      await prisma.unidadEjecutora.upsert({
        where: { ue },
        update: {},
        create: {
          ue,
          secretaria,
          descripcion,
        },
      });
    }

    console.log("UnidadEjecutora seeding completed successfully");
  } catch (error) {
    console.error("Error seeding UnidadEjecutora:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  seederUnidad().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}

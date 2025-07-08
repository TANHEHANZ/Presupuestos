import { prismaC } from "../../../src/infraestructure/config/prisma.client";

export async function seederConfig() {
  console.log("🌱 Seeding configuraciones...");

  const configs = [
    {
      module: "programacion",
      key: "lastMonth",
      value: "1",
    },
  ];

  for (const config of configs) {
    await prismaC.configuracion.upsert({
      where: { key: config.key },
      update: {
        module: config.module,
        value: config.value,
      },
      create: config,
    });
  }

  console.log("✅ Configuraciones insertadas correctamente.");
}

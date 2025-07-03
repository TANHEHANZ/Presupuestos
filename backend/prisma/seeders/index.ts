import { prismaC } from "../../src/infraestructure/config/prisma.client";
import { seederUnidad } from "./unidades/unidad.seeder";
import { seederAdmin } from "./user/admin.seeder";

async function main() {
  try {
    console.log("Starting database seeding...");
    await seederUnidad();
    await seederAdmin();
    console.log("All seeds completed successfully!");
  } catch (error) {
    console.error("Error during seeding:", error);
    throw error;
  }
}

if (require.main === module) {
  main()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prismaC.$disconnect();
    });
}

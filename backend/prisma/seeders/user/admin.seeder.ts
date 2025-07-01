import { prismaC } from "../../../src/infraestructure/config/prisma.client";
import bcrypt from "bcryptjs";
import config from "../../../src/infraestructure/config/config";
import {
  NotFoundError,
  ValidationError,
} from "../../../src/infraestructure/helpers/error";
import { Uservice } from "../../../src/modules/user/services/u_service";

export async function seederAdmin() {
  console.log("Seeding admin user...");

  const ci = "8369155";
  const name = "Admin Hancito";
  const rol = "ADMIN";
  const permisos = ["TODOS"];
  const accesos = ["*"];
  const pass = "hanz1234";

  try {
    const validate = await Uservice.uValidate({ ci });
    console.log("Usuario ya existe, se omite creación.");
    if (!validate) {
      return;
    }
  } catch (error) {
    if (!(error instanceof NotFoundError)) {
      throw new Error("Error al validar existencia de usuario.");
    }
  }

  const unidad = await prismaC.unidadEjecutora.upsert({
    where: { ue: "001" },
    update: {},
    create: {
      ue: "001",
      secretaria: "Secretaría General",
      descripcion: "Unidad Ejecutora por defecto para el usuario admin",
    },
  });

  const hashedPassword = await bcrypt.hash(pass, Number(config.SALT));

  await prismaC.$transaction(async (tx) => {
    await tx.user.create({
      data: {
        ci,
        name,
        rol,
        password: hashedPassword,
        estado: "ACTIVO",
        permisos,
        accesos,
        unidadId: unidad.id,
      },
    });
  });

  console.log("Admin user seeded successfully.");
}

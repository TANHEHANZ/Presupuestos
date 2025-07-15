import { prismaC } from "@/infraestructure/config/prisma.client";
import { DTO_MeResponse } from "../validations/v_meResponse";
import jwt from "jsonwebtoken";
import config from "@/infraestructure/config/config";

export const meService = {
  getMe: async (id_user: string): Promise<string> => {
    const user = await prismaC.user.findUnique({
      where: { id: id_user },
      select: {
        name: true,
        rol: true,
        permisos: true,
        unidadEjecutora: {
          select: { secretaria: true },
        },
      },
    });

    if (!user) throw new Error("Usuario no encontrado");

    const navs = await prismaC.u_navigation.findMany({
      where: { estado: "ACTIVO" },
      include: {
        group: true,
      },
    });
    const tienePermisoTotal = user.permisos.includes("ALL");

    const navPermitidos = tienePermisoTotal
      ? navs
      : navs.filter((nav) => {
          if (!nav.requiredPerms || nav.requiredPerms.length === 0) return true;
          return nav.requiredPerms.some((perm) => user.permisos.includes(perm));
        });

    const groupedNavigation: DTO_MeResponse["_n"] = [];

    for (const nav of navPermitidos) {
      const groupTitle = nav.group?.title || "Sin grupo";
      let group = groupedNavigation.find((g) => g.title === groupTitle);
      if (!group) {
        group = { title: groupTitle, items: [] };
        groupedNavigation.push(group);
      }

      group.items.push({
        label: nav.nombre,
        icon: nav.icon || "",
        path: nav.path || "",
      });
    }

    const response: DTO_MeResponse = {
      _u: {
        name: user.name,
        rol: user.rol,
        unidad: user.unidadEjecutora.secretaria,
      },
      _p: user.permisos,
      _n: groupedNavigation,
    };
    const token = jwt.sign(response, config.token_Me, {
      expiresIn: "7d",
    });
    return token;
  },
  validate: async (id_user: string, token: string): Promise<boolean> => {
    try {
      const decoded = jwt.verify(token, config.token_Me);
      if ((decoded as any)._u?.id && (decoded as any)._u.id !== id_user) {
        return false;
      }
      return true;
    } catch (err) {
      return false;
    }
  },
};

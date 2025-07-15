import { NavItem } from "@/infraestructure/types/nav.type";
import { PERMITION_KEYS } from "../permitions";

export const NAV_ITEMS: Record<string, NavItem> = {
  dashboard: {
    label: "Dashboard",
    icon: "chart",
    path: "/dashboard",
    requiredPerms: PERMITION_KEYS.dashboard.map((p) => p.key),
  },
  presupuestoUnidad: {
    label: "Presupuesto por unidad",
    icon: "coins",
    path: "/dashboard/presupestar",
    requiredPerms: PERMITION_KEYS.presupuestoUni.map((p) => p.key),
  },
  unidad: {
    label: "Unidades ejecutoras",
    icon: "unidades",
    path: "/dashboard/unidades",
    requiredPerms: PERMITION_KEYS.unidades.map((p) => p.key),
  },
  Programacion: {
    label: "Programación finanicera",
    icon: "calendar",
    path: "/dashboard/programacion",
    requiredPerms: PERMITION_KEYS.programation.map((p) => p.key),
  },
  consultas: {
    label: "Consultas",
    icon: "search",
    path: "/dashboard/consultas",
    requiredPerms: PERMITION_KEYS.consultas.map((p) => p.key),
  },
  usuarios: {
    label: "Usuarios",
    icon: "users",
    path: "/dashboard/user",
    requiredPerms: PERMITION_KEYS.user.map((p) => p.key),
  },
  configuration: {
    label: "Configuracion",
    icon: "settings",
    path: "/dashboard/configuration",
    requiredPerms: PERMITION_KEYS.configuration.map((p) => p.key),
  },
};

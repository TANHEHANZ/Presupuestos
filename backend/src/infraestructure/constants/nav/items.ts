import { NavItem } from "@/infraestructure/types/nav.type";
export const NAV_ITEMS: Record<string, NavItem> = {
  dashboard: {
    label: "Dashboard",
    icon: "chart",
    path: "/dashboard/presupuestos",
  },
  unidad: {
    label: "Unidades ejecutoras",
    icon: "unidades",
    path: "/dashboard/presupuestos/unidades",
  },
  consulta: {
    label: "Consultas",
    icon: "proyect",
    path: "/dashboard/presupuestos/consultas",
  },
  usuarios: {
    label: "Usuarios",
    icon: "users",
    path: "/dashboard/presupuestos/user",
  },
};

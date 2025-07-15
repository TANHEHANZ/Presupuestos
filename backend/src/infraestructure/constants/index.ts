import { Permition } from "../types/permition";
import { PERMITION_KEYS } from "./permitions";

export const PERMISSION: Permition[] = [
  {
    group: "Usuarios",
    color: "#2563eb",
    icon: "users",
    permissions: PERMITION_KEYS.user,
  },
  {
    group: "Unidades Ejecutoras",
    color: "#7c3aed",
    icon: "building",
    permissions: PERMITION_KEYS.unidades,
  },
  {
    group: "Presupuesto Unidad ejecutora",
    color: "#10dbd1",
    icon: "coins",
    permissions: PERMITION_KEYS.presupuestoUni,
  },

  {
    group: "Reportes",
    color: "#6366f1",
    icon: "download",
    permissions: PERMITION_KEYS.reportes,
  },
  {
    group: "Consultas",
    color: "#FF9F3B",
    icon: "search",
    permissions: PERMITION_KEYS.consultas,
  },
  {
    group: "Programacion",
    color: "#753AB7",
    icon: "calendar",
    permissions: PERMITION_KEYS.programation,
  },
  {
    group: "dashboard",
    color: "#653FA9",
    icon: "chart",
    permissions: PERMITION_KEYS.dashboard,
  },
];

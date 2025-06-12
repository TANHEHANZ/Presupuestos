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
    group: "Reportes",
    color: "#6366f1",
    icon: "download",
    permissions: PERMITION_KEYS.reportes,
  },
];

import { Nav } from "@/infraestructure/types/nav.type";
import { NAV_ITEMS } from "./items";

export const NAV: Nav[] = [
  {
    title: "GRAFICAS",
    items: [NAV_ITEMS.dashboard],
  },
  {
    title: "MODULOS",
    items: [
      NAV_ITEMS.unidad,
      NAV_ITEMS.Programacion,
      NAV_ITEMS.presupuestoUnidad,
    ],
  },
  {
    title: "CONFIGURACIÓN",
    items: [NAV_ITEMS.usuarios, NAV_ITEMS.configuration],
  },
  {
    title: "CONSULTAS",
    items: [NAV_ITEMS.consultas],
  },
];

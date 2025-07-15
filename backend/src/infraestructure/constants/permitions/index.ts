import { P_configuration } from "./p_configuration";
import { P_consultas } from "./p_consultas";
import { P_dashboard } from "./p_dashboard";
import { P_config } from "./p_permisos";
import { P_preUnidad } from "./p_preUnidad";
import { P_programation } from "./p_programation";
import { P_report } from "./p_report";
import { P_unit } from "./p_unidades";
import { P_user } from "./p_user";

export const PERMITION_KEYS = {
  user: [
    { name: "Crear usuario", key: P_user.CREATE, icon: "user-plus" },
    { name: "Editar usuario", key: P_user.UPDATE, icon: "user-edit" },
    { name: "Eliminar usuario", key: P_user.DELETE, icon: "user-x" },
    { name: "Ver usuarios", key: P_user.LIST, icon: "user" },
  ],
  unidades: [
    { name: "Crear unidad", key: P_unit.CREATE, icon: "add" },
    { name: "Editar unidad", key: P_unit.UPDATE, icon: "edit" },
    { name: "Eliminar unidad", key: P_unit.DELETE, icon: "delete" },
    { name: "Ver unidades", key: P_unit.LIST, icon: "building" },
  ],
  presupuestoUni: [
    {
      name: "subir xlsx presupuesto",
      key: P_preUnidad.UPLODAD,
      icon: "save",
    },
    {
      name: "Ejecucioón presupuestaria",
      key: P_preUnidad.UPLODAD,
      icon: "calendar",
    },
  ],
  reportes: [{ name: "Descargar", key: P_report.DOWNLOAD, icon: "download" }],
  consultas: [
    { name: "Consultas", key: P_consultas.CONSULTAR, icon: "search" },
  ],
  permisos: [
    {
      name: "Asignar permisos ",
      key: P_config.ALL_PERMITION,
      icon: "download",
    },
  ],
  programation: [
    {
      name: "Listar Programación",
      key: P_programation.LIST,
      icon: "calendar",
    },
    {
      name: "Programar",
      key: P_programation.CREATE,
      icon: "calendar",
    },
  ],
  dashboard: [
    {
      name: "Ver Dashboard",
      key: P_dashboard.VIEW_DASHBOARD,
      icon: "chart",
    },
    {
      name: "Exportar Reporte",
      key: P_dashboard.EXPORT_REPORT,
      icon: "chart",
    },
  ],
  configuration: [
    {
      name: "Listar Permisos",
      key: P_configuration.ALL_PERMITION,
      icon: "settings",
    },
    {
      name: "Perfil",
      key: P_configuration.ME,
      icon: "user",
    },
  ],
  all: [{ key: "ALL" }],
};

import { P_config } from "./p_permisos";
import { P_preUnidad } from "./p_preUnidad";
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
      name: "subir presupuesto por unidad",
      key: P_preUnidad.UPLODAD,
      icon: "save",
    },
  ],
  reportes: [{ name: "Descargar", key: P_report.DOWNLOAD, icon: "download" }],
  permisos: [
    {
      name: "Asignar permisos ",
      key: P_config.ALL_PERMITION,
      icon: "download",
    },
  ],
  all: [{ key: "ALL" }],
};

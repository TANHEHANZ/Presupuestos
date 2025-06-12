"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PERMITION_KEYS = void 0;
const p_report_1 = require("./p_report");
const p_unidades_1 = require("./p_unidades");
const p_user_1 = require("./p_user");
exports.PERMITION_KEYS = {
    user: [
        { name: "Crear usuario", key: p_user_1.P_user.CREATE, icon: "user-plus" },
        { name: "Editar usuario", key: p_user_1.P_user.UPDATE, icon: "user-edit" },
        { name: "Eliminar usuario", key: p_user_1.P_user.DELETE, icon: "user-x" },
        { name: "Ver usuarios", key: p_user_1.P_user.LIST, icon: "user" },
    ],
    unidades: [
        { name: "Crear unidad", key: p_unidades_1.P_unit.CREATE, icon: "add" },
        { name: "Editar unidad", key: p_unidades_1.P_unit.UPDATE, icon: "edit" },
        { name: "Eliminar unidad", key: p_unidades_1.P_unit.DELETE, icon: "delete" },
        { name: "Ver unidades", key: p_unidades_1.P_unit.LIST, icon: "building" },
    ],
    reportes: [{ name: "Descargar", key: p_report_1.P_report.DOWNLOAD, icon: "download" }],
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PERMITION_KEYS = void 0;
const p_configuration_1 = require("./p_configuration");
const p_consultas_1 = require("./p_consultas");
const p_dashboard_1 = require("./p_dashboard");
const p_permisos_1 = require("./p_permisos");
const p_preUnidad_1 = require("./p_preUnidad");
const p_programation_1 = require("./p_programation");
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
    presupuestoUni: [
        {
            name: "subir xlsx presupuesto",
            key: p_preUnidad_1.P_preUnidad.UPLODAD,
            icon: "save",
        },
        {
            name: "Ejecucioón presupuestaria",
            key: p_preUnidad_1.P_preUnidad.LIST,
            icon: "calendar",
        },
    ],
    reportes: [{ name: "Descargar", key: p_report_1.P_report.DOWNLOAD, icon: "download" }],
    consultas: [
        { name: "Consultas", key: p_consultas_1.P_consultas.CONSULTAR, icon: "search" },
        { name: "exportar en PDF", key: p_consultas_1.P_consultas.EXPORT_CONSULTA, icon: "pdf" },
        {
            name: "exportar en xlsx",
            key: p_consultas_1.P_consultas.EXPORT_CONSULTA,
            icon: "csv",
        },
    ],
    permisos: [
        {
            name: "Asignar permisos ",
            key: p_permisos_1.P_config.ALL_PERMITION,
            icon: "download",
        },
    ],
    programation: [
        {
            name: "Listar Programación",
            key: p_programation_1.P_programation.LIST,
            icon: "calendar",
        },
        {
            name: "Programar",
            key: p_programation_1.P_programation.CREATE,
            icon: "calendar",
        },
    ],
    dashboard: [
        {
            name: "Ver Dashboard",
            key: p_dashboard_1.P_dashboard.VIEW_DASHBOARD,
            icon: "chart",
        },
        {
            name: "Exportar Reporte",
            key: p_dashboard_1.P_dashboard.EXPORT_REPORT,
            icon: "chart",
        },
    ],
    configuration: [
        {
            name: "Listar Permisos",
            key: p_configuration_1.P_configuration.ALL_PERMITION,
            icon: "settings",
        },
        {
            name: "Perfil",
            key: p_configuration_1.P_configuration.ME,
            icon: "user",
        },
    ],
    all: [{ key: "ALL" }],
};

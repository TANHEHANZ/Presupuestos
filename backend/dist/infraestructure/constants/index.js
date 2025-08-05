"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PERMISSION = void 0;
const permitions_1 = require("./permitions");
exports.PERMISSION = [
    {
        group: "Usuarios",
        color: "#2563eb",
        icon: "users",
        permissions: permitions_1.PERMITION_KEYS.user,
    },
    {
        group: "Unidades Ejecutoras",
        color: "#7c3aed",
        icon: "building",
        permissions: permitions_1.PERMITION_KEYS.unidades,
    },
    {
        group: "Presupuesto Unidad ejecutora",
        color: "#10dbd1",
        icon: "coins",
        permissions: permitions_1.PERMITION_KEYS.presupuestoUni,
    },
    {
        group: "Reportes",
        color: "#6366f1",
        icon: "download",
        permissions: permitions_1.PERMITION_KEYS.reportes,
    },
    {
        group: "Consultas",
        color: "#FF9F3B",
        icon: "search",
        permissions: permitions_1.PERMITION_KEYS.consultas,
    },
    {
        group: "Programacion",
        color: "#753AB7",
        icon: "calendar",
        permissions: permitions_1.PERMITION_KEYS.programation,
    },
    {
        group: "dashboard",
        color: "#653FA9",
        icon: "chart",
        permissions: permitions_1.PERMITION_KEYS.dashboard,
    },
];

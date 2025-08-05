"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NAV_ITEMS = void 0;
const permitions_1 = require("../permitions");
exports.NAV_ITEMS = {
    dashboard: {
        label: "Dashboard",
        icon: "chart",
        path: "/dashboard",
        requiredPerms: permitions_1.PERMITION_KEYS.dashboard.map((p) => p.key),
    },
    presupuestoUnidad: {
        label: "Presupuesto por unidad",
        icon: "coins",
        path: "/dashboard/presupestar",
        requiredPerms: permitions_1.PERMITION_KEYS.presupuestoUni.map((p) => p.key),
    },
    unidad: {
        label: "Unidades ejecutoras",
        icon: "unidades",
        path: "/dashboard/unidades",
        requiredPerms: permitions_1.PERMITION_KEYS.unidades.map((p) => p.key),
    },
    Programacion: {
        label: "Programación finanicera",
        icon: "calendar",
        path: "/dashboard/programacion",
        requiredPerms: permitions_1.PERMITION_KEYS.programation.map((p) => p.key),
    },
    consultas: {
        label: "Consultas",
        icon: "search",
        path: "/dashboard/consultas",
        requiredPerms: permitions_1.PERMITION_KEYS.consultas.map((p) => p.key),
    },
    usuarios: {
        label: "Usuarios",
        icon: "users",
        path: "/dashboard/user",
        requiredPerms: permitions_1.PERMITION_KEYS.user.map((p) => p.key),
    },
    configuration: {
        label: "Configuracion",
        icon: "settings",
        path: "/dashboard/configuration",
        requiredPerms: permitions_1.PERMITION_KEYS.configuration.map((p) => p.key),
    },
};

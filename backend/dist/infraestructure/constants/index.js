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
        group: "Reportes",
        color: "#6366f1",
        icon: "download",
        permissions: permitions_1.PERMITION_KEYS.reportes,
    },
];

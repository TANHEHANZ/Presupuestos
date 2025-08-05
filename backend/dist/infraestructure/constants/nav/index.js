"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NAV = void 0;
const items_1 = require("./items");
exports.NAV = [
    {
        title: "GRAFICAS",
        items: [items_1.NAV_ITEMS.dashboard],
    },
    {
        title: "MODULOS",
        items: [
            items_1.NAV_ITEMS.unidad,
            items_1.NAV_ITEMS.Programacion,
            items_1.NAV_ITEMS.presupuestoUnidad,
        ],
    },
    {
        title: "CONFIGURACIÓN",
        items: [items_1.NAV_ITEMS.usuarios, items_1.NAV_ITEMS.configuration],
    },
    {
        title: "CONSULTAS",
        items: [items_1.NAV_ITEMS.consultas],
    },
];

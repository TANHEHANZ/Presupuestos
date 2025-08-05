"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.P_service = void 0;
const constants_1 = require("../../../infraestructure/constants");
const permitions_1 = require("../../../infraestructure/constants/permitions");
exports.P_service = {
    all: async () => {
        return constants_1.PERMISSION;
    },
    key: async () => {
        return Object.fromEntries(Object.entries(permitions_1.PERMITION_KEYS).map(([group, permisos]) => [
            group,
            permisos.map((permiso) => permiso.key),
        ]));
    },
};

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.meService = void 0;
const prisma_client_1 = require("../../../infraestructure/config/prisma.client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../../infraestructure/config/config"));
exports.meService = {
    getMe: async (id_user) => {
        const user = await prisma_client_1.prismaC.user.findUnique({
            where: { id: id_user },
            select: {
                name: true,
                rol: true,
                permisos: true,
                unidadEjecutora: {
                    select: { secretaria: true },
                },
            },
        });
        if (!user)
            throw new Error("Usuario no encontrado");
        const navs = await prisma_client_1.prismaC.u_navigation.findMany({
            where: { estado: "ACTIVO" },
            include: {
                group: true,
            },
        });
        const tienePermisoTotal = user.permisos.includes("ALL");
        const navPermitidos = tienePermisoTotal
            ? navs
            : navs.filter((nav) => {
                if (!nav.requiredPerms || nav.requiredPerms.length === 0)
                    return true;
                return nav.requiredPerms.some((perm) => user.permisos.includes(perm));
            });
        const groupedNavigation = [];
        for (const nav of navPermitidos) {
            const groupTitle = nav.group?.title || "Sin grupo";
            let group = groupedNavigation.find((g) => g.title === groupTitle);
            if (!group) {
                group = { title: groupTitle, items: [] };
                groupedNavigation.push(group);
            }
            group.items.push({
                label: nav.nombre,
                icon: nav.icon || "",
                path: nav.path || "",
            });
        }
        const response = {
            _u: {
                name: user.name,
                rol: user.rol,
                unidad: user.unidadEjecutora.secretaria,
            },
            _p: user.permisos,
            _n: groupedNavigation,
        };
        const token = jsonwebtoken_1.default.sign(response, config_1.default.token_Me, {
            expiresIn: "7d",
        });
        return token;
    },
    validate: async (id_user, token) => {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, config_1.default.token_Me);
            if (decoded._u?.id && decoded._u.id !== id_user) {
                return false;
            }
            return true;
        }
        catch (err) {
            return false;
        }
    },
    profile: async (idUser) => {
        try {
            const user = await prisma_client_1.prismaC.user.findUnique({
                where: {
                    id: idUser,
                },
                select: {
                    ci: true,
                    name: true,
                    rol: true,
                    estado: true,
                    unidadEjecutora: {
                        select: {
                            secretaria: true,
                            descripcion: true,
                        },
                    },
                },
            });
            if (!user) {
                throw new Error("No se pudo obtener el perfil del usuario");
            }
            return user;
        }
        catch (e) {
            const errorMessage = e instanceof Error
                ? e.message
                : "Error desconocido al obtener el perfil";
            throw new Error(`Error en 'profile': ${errorMessage}`);
        }
    },
};

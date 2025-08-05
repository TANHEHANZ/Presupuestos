"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Uservice = void 0;
const config_1 = __importDefault(require("../../../infraestructure/config/config"));
const prisma_client_1 = require("../../../infraestructure/config/prisma.client");
const error_1 = require("../../../infraestructure/helpers/error");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const constants_1 = require("../../../infraestructure/constants");
exports.Uservice = {
    uValidate: async ({ ci }) => {
        try {
            const existingUser = await prisma_client_1.prismaC.user.findFirst({ where: { ci } });
            if (existingUser) {
                throw new error_1.NotFoundError("El usuario ya se registró.");
            }
            const formData = new URLSearchParams();
            formData.append("tipo", "D");
            formData.append("dato", ci);
            const response = await fetch(config_1.default.sr_user, {
                method: "POST",
                body: formData,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });
            if (!response.ok) {
                const errorData = await response.text();
                console.log(errorData);
                throw new error_1.ValidationError(`Servicio caído, contacta con soporte`);
            }
            const data = await response.json();
            if (!data.status) {
                throw new error_1.ValidationError(data.data);
            }
            const responseApi = data.data;
            return {
                ci: responseApi[0].ci,
                name: responseApi[0].empleado,
            };
        }
        catch (error) {
            console.error("Error en uValidate:", error.message || error);
            if (error instanceof error_1.ValidationError || error instanceof error_1.NotFoundError) {
                throw error;
            }
            throw new Error("No se pudo validar el usuario. Intenta nuevamente.");
        }
    },
    create: async (data) => {
        const { permisos, ...userData } = data;
        try {
            await exports.Uservice.uValidate({ ci: userData.ci });
        }
        catch (error) {
            if (error instanceof error_1.NotFoundError || error instanceof error_1.ValidationError) {
                throw error;
            }
            throw new Error("No se pudo validar el usuario.");
        }
        const hashedPassword = await bcryptjs_1.default.hash(userData.ci, Number(config_1.default.SALT));
        try {
            const result = await prisma_client_1.prismaC.$transaction(async (prisma) => {
                const newUser = await prisma.user.create({
                    data: {
                        ...userData,
                        password: hashedPassword,
                        permisos,
                    },
                    include: {
                        unidadEjecutora: true,
                    },
                });
                return newUser;
            });
            return result;
        }
        catch (error) {
            console.error("Error interno:", error);
            throw new Error("Error interno al crear el usuario");
        }
    },
    changePassword: async ({ change, idUser, }) => {
        if (!change.confirmChange) {
            throw new Error("No confirmaste el cambio de contraseña");
        }
        const user = await prisma_client_1.prismaC.user.findUnique({
            where: { id: idUser },
        });
        if (!user) {
            throw new Error("Usuario no encontrado");
        }
        const isCurrentPasswordValid = await bcryptjs_1.default.compare(change.password, user.password);
        if (!isCurrentPasswordValid) {
            throw new Error("Contraseña actual incorrecta");
        }
        const hashedPassword = await bcryptjs_1.default.hash(change.newPassword, Number(config_1.default.SALT));
        await prisma_client_1.prismaC.user.update({
            where: { id: idUser },
            data: {
                password: hashedPassword,
            },
        });
    },
    all: async () => {
        const users = await prisma_client_1.prismaC.user.findMany({
            include: {
                unidadEjecutora: true,
            },
        });
        const mapPermKeysWithGroups = (userKeys) => {
            return constants_1.PERMISSION.map((group) => {
                const matchingPerms = group.permissions.filter((perm) => userKeys.includes(perm.key));
                if (matchingPerms.length === 0)
                    return null;
                return {
                    group: group.group,
                    color: group.color,
                    icon: group.icon,
                    permissions: matchingPerms,
                };
            }).filter((g) => g !== null);
        };
        return users.map((user) => ({
            id: user.id,
            ci: user.ci,
            name: user.name,
            rol: user.rol,
            estado: user.estado,
            unidadEjecutora: user.unidadEjecutora,
            permisos: mapPermKeysWithGroups(user.permisos),
        }));
    },
    update: async (data) => {
        if (!data.idUser) {
            throw new Error("El ID del usuario es requerido para actualizar");
        }
        const user = await prisma_client_1.prismaC.user.findUnique({
            where: { id: data.idUser },
        });
        if (!user) {
            throw new error_1.NotFoundError("El usuario no existe");
        }
        try {
            const updatedUser = await prisma_client_1.prismaC.user.update({
                where: { id: data.idUser },
                data: {
                    name: data.name,
                    rol: data.rol,
                    estado: data.estado,
                    permisos: data.permisos,
                    unidadId: data.unidadId,
                },
                include: {
                    unidadEjecutora: true,
                },
            });
            return updatedUser;
        }
        catch (error) {
            console.error("Error al actualizar el usuario:", error);
            throw new Error("Error interno al actualizar el usuario");
        }
    },
};

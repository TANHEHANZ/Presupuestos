"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserSchema = void 0;
const prisma_client_1 = require("../../../infraestructure/config/prisma.client");
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
exports.CreateUserSchema = zod_1.z.object({
    idUser: zod_1.z.string().uuid("Debe ser un UUID válido").optional(),
    ci: zod_1.z
        .string()
        .min(6, "La CI debe tener al menos 6 dígitos")
        .max(10, "La CI no puede tener más de 10 dígitos")
        .regex(/^\d+$/, "La CI solo debe contener números"),
    name: zod_1.z
        .string()
        .min(3, "El nombre debe tener al menos 3 caracteres")
        .max(100, "El nombre no puede exceder 100 caracteres"),
    rol: zod_1.z.nativeEnum(client_1.Role),
    estado: zod_1.z.nativeEnum(client_1.U_estado),
    permisos: zod_1.z
        .array(zod_1.z.string().min(1, "Cada permiso debe ser un string no vacío"))
        .nonempty("Debe especificar al menos un permiso"),
    unidadId: zod_1.z
        .string()
        .uuid("Debe ser un UUID válido")
        .refine(async (id) => {
        const unidad = await prisma_client_1.prismaC.unidadEjecutora.findUnique({
            where: { id },
        });
        return !!unidad;
    }, { message: "La unidad que seleccionaste no existe" }),
});

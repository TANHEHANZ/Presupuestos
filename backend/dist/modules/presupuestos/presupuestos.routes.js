"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uploadPresupuestoXlsx_1 = require("./controller/uploadPresupuestoXlsx");
const multer_config_1 = require("../../infraestructure/lib/multer/multer.config");
const permission_checker_1 = require("../../infraestructure/middleware/permission-checker");
const p_preUnidad_1 = require("../../infraestructure/constants/permitions/p_preUnidad");
const validate_1 = require("../../infraestructure/helpers/validate");
const v_upload_1 = require("./validations/v_upload");
const pre_UnidadController_1 = require("./controller/pre_UnidadController");
const p_proyectos_1 = require("../../infraestructure/constants/permitions/p_proyectos");
const proyectoController_1 = require("./controller/proyectoController");
const pre_Routes = (0, express_1.Router)();
// presupuestos por unidad
pre_Routes.post("/unidad/upload-xlsx", (0, permission_checker_1.checkPermission)(p_preUnidad_1.P_preUnidad.UPLODAD), multer_config_1.upload.single("file"), (0, validate_1.validate)(v_upload_1.filePreUnidad, "file"), uploadPresupuestoXlsx_1.uploadXlsx);
pre_Routes.get("/unidad", (0, permission_checker_1.checkPermission)(p_preUnidad_1.P_preUnidad.LIST), pre_UnidadController_1.PreUnidadController.get);
pre_Routes.get("/unidad/listgrup", (0, permission_checker_1.checkPermission)(p_preUnidad_1.P_preUnidad.LIST), pre_UnidadController_1.PreUnidadController.listUEgrup);
pre_Routes.get("/calendar", (0, permission_checker_1.checkPermission)(p_proyectos_1.P_proyect.CALENDAR), proyectoController_1.ProyectController.calendar);
exports.default = pre_Routes;

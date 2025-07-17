"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const permission_checker_1 = require("../../infraestructure/middleware/permission-checker");
const p_user_1 = require("../../infraestructure/constants/permitions/p_user");
const u_controller_1 = require("./controller/u_controller");
const v_uValidate_1 = require("./validations/v_uValidate");
const validate_1 = require("../../infraestructure/helpers/validate");
const v_changePass_1 = require("./validations/v_changePass");
const u_Router = (0, express_1.Router)();
u_Router
    .route("/")
    .get((0, permission_checker_1.checkPermission)(p_user_1.P_user.LIST), u_controller_1.Ucontroller.get)
    .post((0, permission_checker_1.checkPermission)(p_user_1.P_user.CREATE), u_controller_1.Ucontroller.create)
    .put((0, permission_checker_1.checkPermission)(p_user_1.P_user.UPDATE), u_controller_1.Ucontroller.edit);
u_Router.post("/change-pass", (0, validate_1.validate)(v_changePass_1.changePasswordSchema, "body"), u_controller_1.Ucontroller.changePassword);
u_Router.post("/valid", (0, permission_checker_1.checkPermission)(p_user_1.P_user.CREATE), (0, validate_1.validate)(v_uValidate_1.Uvalidate, "body"), u_controller_1.Ucontroller.validate);
exports.default = u_Router;

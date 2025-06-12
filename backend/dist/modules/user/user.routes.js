"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const permission_checker_1 = require("../../infraestructure/middleware/permission-checker");
const p_user_1 = require("../../infraestructure/constants/permitions/p_user");
const u_controller_1 = require("./controller/u_controller");
const u_Router = (0, express_1.Router)();
u_Router.get("/", (0, permission_checker_1.checkPermission)(p_user_1.P_user.GET), u_controller_1.Ucontroller.get);
exports.default = u_Router;

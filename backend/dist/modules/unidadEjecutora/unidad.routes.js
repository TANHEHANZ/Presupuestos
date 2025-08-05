"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uni_controller_1 = require("./controller/uni_controller");
const validate_1 = require("../../infraestructure/helpers/validate");
const v_create_1 = require("./validations/v_create");
const uni_Routes = (0, express_1.Router)();
uni_Routes
    .route("/")
    .get(uni_controller_1.Uni_controller.all)
    .post((0, validate_1.validate)(v_create_1.CreateUnidadSchema, "body"), uni_controller_1.Uni_controller.create)
    .put(uni_controller_1.Uni_controller.update)
    .delete(uni_controller_1.Uni_controller.delete);
exports.default = uni_Routes;

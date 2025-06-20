import { Router } from "express";
import { checkPermission } from "../../infraestructure/middleware/permission-checker";
import { P_user } from "../../infraestructure/constants/permitions/p_user";
import { Ucontroller } from "./controller/u_controller";
import { Uvalidate } from "./validations/v_uValidate";
import { validate } from "@/infraestructure/helpers/validate";

const u_Router = Router();

u_Router.route("/").get(Ucontroller.get).post(Ucontroller.create);

u_Router.post("/valid", validate(Uvalidate, "body"), Ucontroller.validate);
export default u_Router;

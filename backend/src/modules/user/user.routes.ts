import { Router } from "express";
import { checkPermission } from "../../infraestructure/middleware/permission-checker";
import { P_user } from "../../infraestructure/constants/permitions/p_user";
import { Ucontroller } from "./controller/u_controller";
import { validate } from "@/infraestructure/helpers/validate";
import { Uvalidate } from "./validations/v_uValidate";

const u_Router = Router();
u_Router.get("/", checkPermission(P_user.GET), Ucontroller.get);
u_Router.post("/valid", validate(Uvalidate, "body"), Ucontroller.validate);
export default u_Router;

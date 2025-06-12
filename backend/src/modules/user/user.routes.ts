import { Router } from "express";
import { checkPermission } from "../../infraestructure/middleware/permission-checker";
import { P_user } from "../../infraestructure/constants/permitions/p_user";
import { Ucontroller } from "./controller/u_controller";

const u_Router = Router();
u_Router.get("/", checkPermission(P_user.GET), Ucontroller.get);
export default u_Router;

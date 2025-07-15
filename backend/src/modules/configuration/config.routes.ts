import { Router } from "express";
import { PController } from "./controller/p_controller";
import { P_config } from "@/infraestructure/constants/permitions/p_permisos";
import { checkPermission } from "@/infraestructure/middleware/permission-checker";
import { meController } from "./controller/me_controller";

const c_Router = Router();

c_Router.get(
  "/permition",
  checkPermission(P_config.ALL_PERMITION),
  PController.get
);

c_Router.get("/me", meController.me);
c_Router.get("/me/valid", meController.validate_me);

export default c_Router;

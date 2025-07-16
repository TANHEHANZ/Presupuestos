import { Router } from "express";
import { PController } from "./controller/p_controller";
import { P_config } from "@/infraestructure/constants/permitions/p_permisos";
import { checkPermission } from "@/infraestructure/middleware/permission-checker";
import { meController } from "./controller/me_controller";
import { P_user } from "@/infraestructure/constants/permitions/p_user";

const c_Router = Router();

c_Router.get(
  "/permition",
  checkPermission([P_config.ALL_PERMITION, P_user.CREATE]),
  PController.get
);

c_Router.get("/me", meController.me);
c_Router.get("/profile", meController.profile);
c_Router.get("/me/valid", meController.validate_me);

export default c_Router;

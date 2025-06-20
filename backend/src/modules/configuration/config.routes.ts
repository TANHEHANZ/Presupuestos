import { Router } from "express";
import { PController } from "./controller/p_controller";
import { P_config } from "@/infraestructure/constants/permitions/p_permisos";
import { checkPermission } from "@/infraestructure/middleware/permission-checker";

const c_Router = Router();

c_Router.get(
  "/permition",
  checkPermission(P_config.ALL_PERMITION),
  PController.get
);
c_Router.get(
  "/permition/key",
  checkPermission(P_config.KEY_PERMITION),
  PController.key
);
c_Router.get("/nav", checkPermission(P_config.ALL_NAV_ITEMS));

export default c_Router;

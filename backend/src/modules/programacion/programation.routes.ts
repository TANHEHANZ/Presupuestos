import { Router } from "express";
import { Prog_controller } from "./controller/prog_controller";
import { validate } from "@/infraestructure/helpers/validate";
import { ParamsSchema } from "./validators/v_prog";
import { checkPermission } from "@/infraestructure/middleware/permission-checker";
import { P_programation } from "@/infraestructure/constants/permitions/p_programation";

const prog_Router = Router();
prog_Router.post(
  "/",
  validate(ParamsSchema),
  checkPermission(P_programation.CREATE),
  Prog_controller.create
);
prog_Router.get(
  "/",
  checkPermission(P_programation.LIST),
  Prog_controller.list
);
export default prog_Router;

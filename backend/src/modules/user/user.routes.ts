import { Router } from "express";
import { checkPermission } from "../../infraestructure/middleware/permission-checker";
import { P_user } from "../../infraestructure/constants/permitions/p_user";
import { Ucontroller } from "./controller/u_controller";
import { Uvalidate } from "./validations/v_uValidate";
import { validate } from "@/infraestructure/helpers/validate";

const u_Router = Router();

u_Router
  .route("/")
  .get(checkPermission(P_user.GET), Ucontroller.get)
  .post(checkPermission(P_user.CREATE), Ucontroller.create);

u_Router.post(
  "/valid",
  checkPermission(P_user.CREATE),
  validate(Uvalidate, "body"),
  Ucontroller.validate
);
export default u_Router;

import { Router } from "express";
import { checkPermission } from "../../infraestructure/middleware/permission-checker";
import { P_user } from "../../infraestructure/constants/permitions/p_user";
import { Ucontroller } from "./controller/u_controller";
import { Uvalidate } from "./validations/v_uValidate";
import { validate } from "@/infraestructure/helpers/validate";
import { changePasswordSchema } from "./validations/v_changePass";

const u_Router = Router();

u_Router
  .route("/")
  .get(checkPermission(P_user.LIST), Ucontroller.get)
  .post(checkPermission(P_user.CREATE), Ucontroller.create)
  .put(checkPermission(P_user.UPDATE), Ucontroller.edit);
u_Router.post(
  "/change-pass",
  validate(changePasswordSchema, "body"),
  Ucontroller.changePassword
);
u_Router.post(
  "/valid",
  checkPermission(P_user.CREATE),
  validate(Uvalidate, "body"),
  Ucontroller.validate
);
export default u_Router;

import { Router } from "express";
import { lnController } from "./controller/ln_controller";
import { validate } from "@/infraestructure/helpers/validate";
import { Credentials } from "./validations/credentials";

const ln_Routes = Router();
ln_Routes.route("/").post(validate(Credentials, "body"), lnController.login);
ln_Routes.post("/refresh", lnController.refresh);
ln_Routes.post("/logout", lnController.logout);
export default ln_Routes;

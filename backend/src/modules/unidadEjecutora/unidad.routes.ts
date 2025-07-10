import { Router } from "express";
import { Uni_controller } from "./controller/uni_controller";
import { validate } from "@/infraestructure/helpers/validate";
import { CreateUnidadSchema } from "./validations/v_create";

const uni_Routes = Router();

uni_Routes
  .route("/")
  .get(Uni_controller.all)
  .post(validate(CreateUnidadSchema, "body"), Uni_controller.create)
  .put(Uni_controller.update)
  .delete(Uni_controller.delete);

export default uni_Routes;

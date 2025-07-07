import { Router } from "express";
import { Prog_controller } from "./controller/prog_controller";
import { validate } from "@/infraestructure/helpers/validate";
import { ParamsSchema } from "./validators/v_prog";

const prog_Router = Router();
prog_Router.post("/", validate(ParamsSchema), Prog_controller.create);
prog_Router.get("/", Prog_controller.list);
export default prog_Router;

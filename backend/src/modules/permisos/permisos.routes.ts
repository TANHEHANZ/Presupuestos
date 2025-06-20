import { Router } from "express";
import { PController } from "./controller/p_controller";

const p_Router = Router();

p_Router.route("/").get(PController.get);
p_Router.route("/key").get(PController.key);

export default p_Router;

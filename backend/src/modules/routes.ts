import { Router } from "express";
import u_Router from "./user/user.routes";
import uni_Routes from "./unidadEjecutora/unidad.routes";

const routes = Router();
routes.use("/user", u_Router);
routes.use("/unidade", uni_Routes);
export default routes;

import { Router } from "express";
import u_Router from "./user/user.routes";
import uni_Routes from "./unidadEjecutora/unidad.routes";
import p_Router from "./permisos/permisos.routes";

const routes = Router();
routes.use("/user", u_Router);
routes.use("/unidad", uni_Routes);
routes.use("/permisos", p_Router);
export default routes;

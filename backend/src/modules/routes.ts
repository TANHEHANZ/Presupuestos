import { Router } from "express";
import u_Router from "./user/user.routes";

const routes = Router();
routes.use("/user", u_Router);
export default routes;

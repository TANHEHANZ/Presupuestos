import { Router } from "express";
import { DAController } from "./controllers/C_DA.controller";
import { FilterController } from "./controllers/filter.controller";
import { checkPermission } from "@/infraestructure/middleware/permission-checker";
import { P_consultas } from "@/infraestructure/constants/permitions/p_consultas";

const consultas_Routes = Router();

consultas_Routes.get(
  "/DA",
  checkPermission(P_consultas.CONSULTAR),
  DAController
);
consultas_Routes.get(
  "/",
  checkPermission(P_consultas.CONSULTAR),
  FilterController
);

export default consultas_Routes;

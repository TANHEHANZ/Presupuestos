import { Router } from "express";
import { DAController } from "./controllers/C_DA.controller";
import { validate } from "@/infraestructure/helpers/validate";
import { consultaSchema } from "./validations/v_consulta";
import { FilterController } from "./controllers/filter.controller";

const consultas_Routes = Router();

consultas_Routes.get("/DA", DAController);
consultas_Routes.get("/", FilterController);

export default consultas_Routes;

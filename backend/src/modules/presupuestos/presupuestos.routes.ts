import { Router } from "express";
import { uploadXlsx } from "./controller/uploadPresupuestoXlsx";
import { upload } from "@/infraestructure/lib/multer/multer.config";
import { checkPermission } from "@/infraestructure/middleware/permission-checker";
import { P_preUnidad } from "@/infraestructure/constants/permitions/p_preUnidad";
import { validate } from "@/infraestructure/helpers/validate";
import { filePreUnidad } from "./validations/v_upload";
import { PreUnidadController } from "./controller/pre_UnidadController";
import { P_proyect } from "@/infraestructure/constants/permitions/p_proyectos";
import { ProyectController } from "./controller/proyectoController";

const pre_Routes = Router();
// presupuestos por unidad
pre_Routes.post(
  "/unidad/upload-xlsx",
  checkPermission(P_preUnidad.UPLODAD),
  upload.single("file"),
  validate(filePreUnidad, "file"),
  uploadXlsx
);
pre_Routes.get(
  "/unidad",
  checkPermission(P_preUnidad.LIST),
  PreUnidadController.get
);
pre_Routes.get(
  "/unidad/listgrup",
  checkPermission(P_preUnidad.LIST),
  PreUnidadController.listUEgrup
);
pre_Routes.get(
  "/proyecto",
  checkPermission(P_proyect.LIST),
  ProyectController.list
);
export default pre_Routes;

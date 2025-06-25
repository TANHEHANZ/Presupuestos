import { Router } from "express";
import { uploadXlsx } from "./controller/uploadPresupuestoXlsx";
import { upload } from "@/infraestructure/lib/multer/multer.config";
import { checkPermission } from "@/infraestructure/middleware/permission-checker";
import { P_preUnidad } from "@/infraestructure/constants/permitions/p_preUnidad";
import { validate } from "@/infraestructure/helpers/validate";
import { filePreUnidad } from "./validations/v_upload";

const pre_Routes = Router();
// presupuestos por unidad
pre_Routes.post(
  "/unidad/upload-xlsx",
  checkPermission(P_preUnidad.UPLODAD),
  upload.single("file"),
  validate(filePreUnidad, "file"),
  uploadXlsx
);
export default pre_Routes;

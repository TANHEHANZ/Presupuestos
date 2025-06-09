import { Router } from "express";
import appoventRouter from "./modules/approvet/approvet.routes";
const appovent = Router();

appovent.use("/approvet", appoventRouter);

export default appovent;

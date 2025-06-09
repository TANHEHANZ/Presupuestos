import express, { Request, Response } from "express";
import cors from "cors";
import routes from "./modules/routes";
import path from "path";

export const createServer = () => {
  const app = express();

  app
    .disable("x-powered-by")
    .use(express.urlencoded({ extended: true }))
    .use(express.json({ limit: "50mb" }))
    .use(express.json())
    .use(cors())
    .use("/v1/api/", routes)
    .use(express.static(path.join(__dirname, "../public")));

  app.get("/", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../src/modules/public/index.html"));
  });

  return app;
};

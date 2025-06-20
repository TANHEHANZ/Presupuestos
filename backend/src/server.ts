import express, { Request, Response } from "express";
import cors from "cors";
import routes from "./modules/routes";
import path from "path";
import cookieParser from "cookie-parser";
export const createServer = () => {
  const allowedOrigin = "http://localhost:4200";
  const app = express();
  app.use(cookieParser());
  app
    .disable("x-powered-by")
    .use(express.urlencoded({ extended: true }))
    .use(express.json({ limit: "100mb" }))
    .use(express.json());
  app
    .use(
      cors({
        origin: allowedOrigin,
        credentials: true,
      })
    )
    .use("/v1/api/", routes)
    .use(express.static(path.join(__dirname, "../public")));

  app.get("/", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../src/modules/public/index.html"));
  });

  return app;
};

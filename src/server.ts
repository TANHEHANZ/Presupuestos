import express, { Request, Response } from "express";
import cors from "cors";
import appovent from "../routes";

export const createServer = () => {
  const app = express();

  app
    .disable("x-powered-by")
    .use(express.urlencoded({ extended: true }))
    .use(express.json({ limit: "50mb" }))
    .use(express.json())
    .use(cors())
    .use("/v1/api/", appovent);

  app.get("/", (req: Request, res: Response) => {
    res.json({
      status: "success",
      message: "Appovent Service is running",
      timestamp: new Date().toISOString(),
    });
  });

  return app;
};

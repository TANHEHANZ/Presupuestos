import { Request, Response } from "express";

export const Uni_controller = {
  get: async (req: Request, res: Response): Promise<void> => {
    console.log("idUusario", req.user!.id);
    res.json("user");
    return;
  },
  create: async (req: Request, res: Response): Promise<void> => {},
  update: async (req: Request, res: Response): Promise<void> => {},
  delete: async (req: Request, res: Response): Promise<void> => {},
};

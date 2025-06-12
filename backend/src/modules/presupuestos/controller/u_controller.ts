import { Request, Response } from "express";

export const Ucontroller = {
  get: async (req: Request, res: Response): Promise<void> => {
    console.log("idUusario", req.user!.id);
    res.json("user");
    return;
  },
  create: async (req: Request, res: Response): Promise<void> => {},
};

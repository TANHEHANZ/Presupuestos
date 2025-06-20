import { decryptPayload } from "@/infraestructure/middleware/crypto";

export const valid = async (req: Request, res: Response): Promise<void> => {
  const token = req.body;
};

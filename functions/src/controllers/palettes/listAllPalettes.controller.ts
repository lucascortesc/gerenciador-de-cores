import { Request, Response } from "express";
import { listAllPalettesService } from "../../services/exportServices";

export const listAllPalettes = async (req: Request, res: Response): Promise<Response> => {
  const { userId } = res.locals;

  const palettes = await listAllPalettesService(userId);

  return res.json(palettes).status(200);
};

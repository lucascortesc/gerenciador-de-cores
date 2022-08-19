import { Request, Response } from "express";
import { createPaletteService } from "../../services/exportServices";

export const createPalette = async (req: Request, res: Response): Promise<Response> => {
  const data = req.body;
  const { userId } = res.locals;

  const newPalette = await createPaletteService(data, userId);

  return res.status(201).json(newPalette);
};

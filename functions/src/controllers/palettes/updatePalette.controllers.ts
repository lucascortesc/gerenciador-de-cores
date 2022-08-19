import { Request, Response } from "express";
import { updatePaletteService } from "../../services/exportServices";

export const updatePalette = async (req: Request, res: Response): Promise<Response> => {
  const { userId } = res.locals;
  const { id } = req.params;
  const data = req.body;

  const palette = await updatePaletteService(userId, id, data);

  return res.status(200).json(palette);
};

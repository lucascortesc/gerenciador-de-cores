import { Request, Response } from "express";
import { retrievePaletteService } from "../../services/exportServices";

export const retrievePallete = async (req: Request, res: Response): Promise<Response> => {
  const { userId } = res.locals;
  const { id } = req.params;

  const palette = await retrievePaletteService(userId, id);

  return res.status(200).json(palette);
};

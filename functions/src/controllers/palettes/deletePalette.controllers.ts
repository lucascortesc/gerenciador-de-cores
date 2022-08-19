import { Request, Response } from "express";
import { deletePaletteService } from "../../services/exportServices";

export const deletePalette = async (req: Request, res: Response): Promise<Response> => {
  const { userId } = res.locals;
  const { id } = req.params;

  await deletePaletteService(userId, id);

  return res.status(200).json({ message: "palette deleted with sucess" });
};

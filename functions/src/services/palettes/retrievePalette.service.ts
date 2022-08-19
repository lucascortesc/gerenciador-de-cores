import { AppError } from "../../errors/AppError";
import { db } from "../../index";
import { IPaletteResponse } from "../../interfaces/palettes";

export const retrievePaletteService = async (userId: string, paletteId: string): Promise<IPaletteResponse> => {
  const palette = await db.collection("users").doc(userId).collection("palettes").doc(paletteId).get();

  if (!palette.exists) {
    throw new AppError("palette not found", 404);
  }

  return {
    id: palette.id,
    name: palette.data()?.name,
    colors: palette.data()?.colors,
  };
};

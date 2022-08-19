import { AppError } from "../../errors/AppError";
import { db } from "../../index";
import { IPaletteResponse, IPaletteUpdate } from "../../interfaces/palettes";

export const updatePaletteService = async (
  userId: string,
  paletteId: string,
  data: IPaletteUpdate
): Promise<IPaletteResponse> => {
  const paletteDoc = db.collection("users").doc(userId).collection("palettes").doc(paletteId);

  const palette = await paletteDoc.get();

  if (!palette.exists) {
    throw new AppError("palette not found", 404);
  }

  await paletteDoc.update({ ...data });

  const updatedPalette = await paletteDoc.get();

  return {
    id: updatedPalette.id,
    name: updatedPalette.data()?.name,
    colors: updatedPalette.data()?.colors,
  };
};

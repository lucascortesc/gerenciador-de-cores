import { AppError } from "../../errors/AppError";
import { db } from "../../index";

export const deletePaletteService = async (userId: string, paletteId: string) => {
  const paletteDoc = db.collection("users").doc(userId).collection("palettes").doc(paletteId);

  const palette = await paletteDoc.get();

  if (!palette.exists) {
    throw new AppError("palette not found", 404);
  }

  await paletteDoc.delete();
};

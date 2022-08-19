import { db } from "../..";
import { AppError } from "../../errors/AppError";
import { IPaletteResponse } from "../../interfaces/palettes";

export const listAllPalettesService = async (userId: string): Promise<IPaletteResponse[]> => {
  const user = await db.collection("users").doc(userId).collection("palettes").get();

  if (!user.docs) {
    throw new AppError("expired token, redirecting to login page", 403);
  }

  const palettes: IPaletteResponse[] = user.docs.map((doc) => {
    return {
      id: doc.id,
      name: doc.data().name,
      colors: doc.data().colors,
    };
  });

  return palettes;
};

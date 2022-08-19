import { v4 as uuidv4 } from "uuid";
import { AppError } from "../../errors/AppError";
import { db } from "../../index";
import { IPalleteRequest, IPalleteResponse } from "../../interfaces/exportInterfaces";

export const createPaletteService = async (data: IPalleteRequest, userId: string): Promise<IPalleteResponse> => {
  const user = await db.collection("users").doc(userId).get();

  if (!user.exists) {
    throw new AppError("user must be logged in, redirecting to login page", 403);
  }

  const palletId = uuidv4();

  await db.collection("users").doc(userId).collection("palettes").doc(palletId).set(data);

  return { id: palletId, ...data };
};

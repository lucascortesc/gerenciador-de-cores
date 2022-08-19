import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppError } from "../../errors/AppError";
import { db } from "../../index";
import { ILoginUser } from "../../interfaces/user";

export const loginService = async ({ email, password }: ILoginUser): Promise<string> => {
  const userExists = await db.collection("users").where("email", "==", email).get();

  if (userExists.empty) {
    throw new AppError("email or password incorrect", 401);
  }

  const user = { ...userExists.docs[0].data() };
  const userId = userExists.docs[0].id;

  const passwordMatch = bcrypt.compareSync(password, user.password);

  if (!passwordMatch) {
    throw new AppError("email or password incorrect", 401);
  }

  const token = jwt.sign({ id: userId }, process.env.SECRET_KEY as string, {
    expiresIn: "24h",
  });

  return token;
};

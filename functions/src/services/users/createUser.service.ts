import * as bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { AppError } from "../../errors/AppError";
import { db } from "../../index";
import { IUserRequest, IUserResponse } from "../../interfaces/exportInterfaces";

export const createUserService = async ({ name, email, password }: IUserRequest): Promise<IUserResponse> => {
  const userExists = await db.collection("users").where("email", "==", email).get();

  if (!userExists.empty) {
    throw new AppError("email already exists", 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const id = uuidv4();

  const user = {
    name,
    email,
    password: hashedPassword,
  };

  await db
    .collection("users")
    .doc(id)
    .set(user)
    .catch((error) => {
      throw new AppError(error);
    });

  return { id, name, email };
};

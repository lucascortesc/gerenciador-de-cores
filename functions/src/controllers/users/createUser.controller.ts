import { Request, Response } from "express";
import { createUserService } from "../../services/exportServices";

export const createUser = async (req: Request, res: Response): Promise<Response> => {
  const { name, email, password } = req.body;

  const newUser = await createUserService({ name, email, password });

  return res.status(201).json(newUser);
};

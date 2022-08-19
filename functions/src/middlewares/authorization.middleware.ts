import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/AppError";

export const authorization = (req: Request, res: Response, next: NextFunction): void => {
  let token = req.headers.authorization;

  if (!token) {
    throw new AppError("missing token", 401);
  }

  const splitToken = token.split(" ")[1];

  jwt.verify(splitToken, process.env.SECRET_KEY as string, (error: any, decoded: any) => {
    if (error) {
      throw new AppError("invalid or expired token", 401);
    }

    res.locals.userId = decoded.id;

    next();
  });
};

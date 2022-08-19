import { Router } from "express";
import { createUser, login } from "../controllers/exportControllers";
import { schemaValidation } from "../middlewares/schemaValidation.middleware";
import { createUserSchema, loginSchema } from "../validation";

export const userRoutes = Router();

userRoutes.post("/register", schemaValidation(createUserSchema), createUser);
userRoutes.post("/login", schemaValidation(loginSchema), login);

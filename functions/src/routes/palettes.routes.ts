import { Router } from "express";
import { createPalette } from "../controllers/exportControllers";
import { authorization } from "../middlewares/authorization.middleware";
import { schemaValidation } from "../middlewares/schemaValidation.middleware";
import { createPaletteSchema } from "../validation/palettes";

export const palettesRoutes = Router();

palettesRoutes.post("", authorization, schemaValidation(createPaletteSchema), createPalette);

import { Router } from "express";
import {
  createPalette,
  deletePalette,
  listAllPalettes,
  retrievePallete,
  updatePalette,
} from "../controllers/exportControllers";
import { authorization } from "../middlewares/authorization.middleware";
import { schemaValidation } from "../middlewares/schemaValidation.middleware";
import { createPaletteSchema, updatePaletteSchema } from "../validation/palettes";

export const palettesRoutes = Router();

palettesRoutes.post("", authorization, schemaValidation(createPaletteSchema), createPalette);
palettesRoutes.get("", authorization, listAllPalettes);
palettesRoutes.get("/:id", authorization, retrievePallete);
palettesRoutes.patch("/:id", authorization, schemaValidation(updatePaletteSchema), updatePalette);
palettesRoutes.delete("/:id", authorization, deletePalette);

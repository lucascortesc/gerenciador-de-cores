import cors from "cors";
import express from "express";
import "express-async-errors";
import * as admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import * as functions from "firebase-functions";
import { handleAppError } from "./middlewares/handleAppError.middleware";
import { palettesRoutes, userRoutes } from "./routes/exportRoutes";

const serviceAccount = require("../src/config/tpa-teste-tecnico-firebase-adminsdk-zvd3a-071077d070.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://tpa-teste-tecnico-default-rtdb.firebaseio.com",
});

export const db = getFirestore();

const api = express();

api.use(express.json());
api.use(cors());
api.use("", userRoutes);
api.use("/palettes", palettesRoutes);
api.use(handleAppError);

exports.api = functions.https.onRequest(api);

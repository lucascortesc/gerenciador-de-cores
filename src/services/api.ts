import axios from "axios";

export const api = axios.create({
  baseURL: "https://us-central1-tpa-teste-tecnico.cloudfunctions.net/api",
});

import { IUser } from "../interfaces";
import { api } from "../services/api";

export const validateToken = async (token: string, user: IUser): Promise<boolean> => {
  let validated = false;

  if (user && token) {
    await api
      .get("/palettes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        validated = true;
      })
      .catch(() => (validated = false));

    if (!validated) {
      localStorage.clear();
      return false;
    } else {
      return true;
    }
  }
  return false;
};

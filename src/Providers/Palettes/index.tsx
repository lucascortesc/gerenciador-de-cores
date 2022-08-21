import { createContext, useContext, useState } from "react";
import { IChildren, ICreatePalette, IPalette } from "../../interfaces";
import { api } from "../../services/api";
import { validateToken } from "../validateToken";

interface PalettesProvider {
  palettes: IPalette[];
  createPalette: ICreatePalette;
  setCreatePalette: (value: any) => void;
  getPalettes: () => Promise<any>;
  postPalette: (data: IPalette) => Promise<any>;
}
const PalettesContext = createContext<PalettesProvider>({} as PalettesProvider);

export const usePalettes = () => useContext(PalettesContext);

export const PalettesProvider = ({ children }: IChildren) => {
  const [palettes, setPalettes] = useState<IPalette[]>([]);
  const [createPalette, setCreatePalette] = useState<ICreatePalette>({ step: 1 });

  const getPalettes = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "");
    const token = localStorage.getItem("token") || "";

    if (!(await validateToken(token, user))) {
      localStorage.clear();
      return "missing or expired token";
    }

    let response;

    await api
      .get("/palettes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setPalettes(res.data);
        response = true;
      })
      .catch((err) => (response = err.response.data));

    return response;
  };

  const postPalette = async (data: IPalette) => {
    const user = JSON.parse(localStorage.getItem("user") || "");
    const token = localStorage.getItem("token") || "";

    if (!(await validateToken(token, user))) {
      localStorage.clear();
      return "missing or expired token";
    }

    let response;

    await api
      .post("/palettes", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setPalettes([...palettes, res.data]);
        response = true;
      })
      .catch((err) => (response = err.response.data));

    return response;
  };

  return (
    <PalettesContext.Provider value={{ palettes, getPalettes, createPalette, setCreatePalette, postPalette }}>
      {children}
    </PalettesContext.Provider>
  );
};

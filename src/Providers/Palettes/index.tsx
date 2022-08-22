import { createContext, useContext, useState } from "react";
import { IChildren, IColorBrithness, ICreatePalette, IPalette } from "../../interfaces";
import { api } from "../../services/api";
import { validateToken } from "../validateToken";

interface PalettesProvider {
  palettes: IPalette[];
  createPalette: ICreatePalette;
  setCreatePalette: (value: any) => void;
  getPalettes: () => Promise<any>;
  postPalette: (data: IPalette) => Promise<any>;
  deletePalette: (id: string) => Promise<any>;
  colors: IColorBrithness[];
  setColors: (value: any) => void;
  updatePalette: (id: string, data: IPalette) => Promise<any>;
}
const PalettesContext = createContext<PalettesProvider>({} as PalettesProvider);

export const usePalettes = () => useContext(PalettesContext);

export const PalettesProvider = ({ children }: IChildren) => {
  const [palettes, setPalettes] = useState<IPalette[]>([]);
  const [createPalette, setCreatePalette] = useState<ICreatePalette>({ step: 1 });
  const [colors, setColors] = useState<IColorBrithness[]>([]);

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

  const deletePalette = async (id: string) => {
    const user = JSON.parse(localStorage.getItem("user") || "");
    const token = localStorage.getItem("token") || "";

    if (!(await validateToken(token, user))) {
      localStorage.clear();
      return "missing or expired token";
    }

    let response;

    await api
      .delete(`/palettes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setPalettes(palettes.filter((palette) => palette.id !== id));
        response = true;
      })
      .catch((err) => (response = err.response.data));

    return response;
  };

  const updatePalette = async (id: string, data: IPalette) => {
    const user = JSON.parse(localStorage.getItem("user") || "");
    const token = localStorage.getItem("token") || "";

    if (!(await validateToken(token, user))) {
      localStorage.clear();
      return "missing or expired token";
    }

    let response;

    await api
      .patch(`/palettes/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const aux = [...palettes];
        const index = aux.findIndex((palette) => palette.id === id);
        aux[index] = res.data;
        setPalettes(aux);
        response = true;
      })
      .catch((err) => (response = err.response.data));

    return response;
  };

  return (
    <PalettesContext.Provider
      value={{
        palettes,
        getPalettes,
        createPalette,
        setCreatePalette,
        postPalette,
        deletePalette,
        colors,
        setColors,
        updatePalette,
      }}
    >
      {children}
    </PalettesContext.Provider>
  );
};

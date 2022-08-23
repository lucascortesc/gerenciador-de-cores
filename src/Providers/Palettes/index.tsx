import { createContext, useContext, useState } from "react";
import { IChildren, IColor, ICreatePalette, IPalette, Response } from "../../interfaces";
import { api } from "../../services/api";
import { validateToken } from "../validateToken";

interface PalettesProvider {
  palettes: IPalette[];
  createPalette: ICreatePalette;
  setCreatePalette: (value: ICreatePalette) => void;
  getPalettes: () => Promise<Response>;
  postPalette: (data: IPalette) => Promise<Response>;
  deletePalette: (id: string) => Promise<Response>;
  colors: IColor[];
  setColors: (value: IColor[]) => void;
  updatePalette: (id: string, data: IPalette) => Promise<Response>;
  isDark: (color: IColor) => string;
}
const PalettesContext = createContext<PalettesProvider>({} as PalettesProvider);

export const usePalettes = () => useContext(PalettesContext);

export const PalettesProvider = ({ children }: IChildren) => {
  const [palettes, setPalettes] = useState<IPalette[]>([]);
  const [createPalette, setCreatePalette] = useState<ICreatePalette>({ step: 1 });
  const [colors, setColors] = useState<IColor[]>([]);

  const getPalettes = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "");
    const token = localStorage.getItem("token") || "";

    if (!(await validateToken(token, user))) {
      localStorage.clear();
      return { error: "missing or expired token" };
    }

    let response: Response = {} as Response;

    await api
      .get("/palettes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setPalettes(res.data);
        response = { success: "Sucesso em recuperar paletas" };
      })
      .catch((err) => {
        response = err.response?.data;
      });

    return response;
  };

  const postPalette = async (data: IPalette) => {
    const user = JSON.parse(localStorage.getItem("user") || "");
    const token = localStorage.getItem("token") || "";

    if (!(await validateToken(token, user))) {
      localStorage.clear();
      return { error: "missing or expired token" };
    }

    let response: Response = {} as Response;

    await api
      .post("/palettes", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setPalettes([...palettes, res.data]);
        response = { success: "Paleta criada com sucesso" };
      })
      .catch((err) => {
        response = err.response?.data;
      });

    return response;
  };

  const deletePalette = async (id: string) => {
    const user = JSON.parse(localStorage.getItem("user") || "");
    const token = localStorage.getItem("token") || "";

    if (!(await validateToken(token, user))) {
      localStorage.clear();
      return { error: "missing or expired token" };
    }

    let response: Response = {} as Response;

    await api
      .delete(`/palettes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setPalettes(palettes.filter((palette) => palette.id !== id));
        response = { success: "Paleta deletada com sucesso" };
      })
      .catch((err) => {
        response = err.response?.data;
      });

    return response;
  };

  const updatePalette = async (id: string, data: IPalette) => {
    const user = JSON.parse(localStorage.getItem("user") || "");
    const token = localStorage.getItem("token") || "";

    if (!(await validateToken(token, user))) {
      localStorage.clear();
      return { error: "missing or expired token" };
    }

    let response: Response = {} as Response;

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
        response = { success: "Paleta editada com sucesso" };
      })
      .catch((err) => {
        response = err.response?.data;
      });

    return response;
  };

  const isDark = (color: IColor) => {
    if (color.rgba) {
      const rgba: string[] = color.rgba.split(",");

      const r = Number(rgba[0]);
      const g = Number(rgba[1]);
      const b = Number(rgba[2]);

      const brightness: boolean = (r * 299 + g * 587 + b * 114) / 1000 > 128 ? false : true;

      return brightness ? "white" : "black";
    }

    return "black";
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
        isDark,
      }}
    >
      {children}
    </PalettesContext.Provider>
  );
};

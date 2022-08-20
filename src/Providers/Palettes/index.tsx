import { createContext, useContext, useState } from "react";
import { IChildren, IPallete } from "../../interfaces";

const PalettesContext = createContext({});

export const usePalettes = () => useContext(PalettesContext);

export const PalettesProvider = ({ children }: IChildren) => {
  const [palettes, setPalettes] = useState<IPallete[]>([]);

  return <PalettesContext.Provider value={{}}>{children}</PalettesContext.Provider>;
};

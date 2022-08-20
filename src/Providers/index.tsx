import { IChildren } from "../interfaces";
import { PalettesProvider } from "./Palettes/index";
import { UserProvider } from "./User";

export const Providers = ({ children }: IChildren) => {
  return (
    <UserProvider>
      <PalettesProvider>{children}</PalettesProvider>
    </UserProvider>
  );
};

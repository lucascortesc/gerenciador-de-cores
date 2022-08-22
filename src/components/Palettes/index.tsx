import { usePalettes } from "../../Providers/Palettes";
import { Palette } from "../Palette";
import { Container } from "./styled";

export const Palettes = () => {
  const { palettes } = usePalettes();

  return (
    <Container>
      {palettes.map((palette) => {
        return <Palette palette={palette} key={palette.id} />;
      })}
    </Container>
  );
};

import { IPalette } from "../../interfaces";
import { usePalettes } from "../../Providers/Palettes";
import { Palette } from "../Palette";
import { Container } from "./styled";

interface Props {
  filtredPalettes: IPalette[];
}

export const Palettes: React.FC<Props> = ({ filtredPalettes }) => {
  const { palettes } = usePalettes();

  return (
    <Container>
      {filtredPalettes.map((palette) => {
        return <Palette palette={palette} key={palette.id} />;
      })}
    </Container>
  );
};

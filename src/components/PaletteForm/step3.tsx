import { Button } from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";
import Lottie from "react-lottie";
import { IPalette, Response } from "../../interfaces";
import animatedLoading from "../../lottie/41343-4-color-circles-loading.json";
import { usePalettes } from "../../Providers/Palettes";
import { Step3Container } from "./styled";

interface Props {
  setOpenModal: (value: boolean) => void;
  title: string;
}
export const FormStep3: React.FC<Props> = ({ setOpenModal, title }) => {
  const { createPalette, setCreatePalette } = usePalettes();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { colors, postPalette, updatePalette } = usePalettes();

  const handleBack = () => {
    setCreatePalette({ ...createPalette, step: 2 });
  };

  const loadingOptions = {
    loop: true,
    autoplay: true,
    animationData: animatedLoading,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const confirmSubmit = async () => {
    setIsLoading(true);
    const name = createPalette.name || " ";
    const palette: IPalette = {
      colors,
      name,
    };

    let res: Response = {} as Response;

    if (title === "Criando cores") {
      res = await postPalette(palette);
    } else {
      if (createPalette.id) {
        res = await updatePalette(createPalette.id, palette);
      }
    }
    if (res.error) {
      toast.error(res.error);
      setIsLoading(false);
    } else {
      toast.success(res.success!);
      setCreatePalette({ step: 1 });
      setOpenModal(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0.5 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
      <Step3Container>
        <p className="step3__title">Confirmação</p>
        <div className="step3__name-container">
          <p>
            Nome da paleta: <span className="step3__name">{createPalette.name}</span>
          </p>
        </div>
        {createPalette.colors?.map((color, index) => {
          return (
            <div className="step3__container-names" key={`step3${index}`}>
              <p className="step3__name-color">{color.name.trim() ? color.name : `Cor ${index + 1}`}</p>
              <div className="step3__color" style={{ background: color.hex }} />
            </div>
          );
        })}
        <div className="step3__container-buttons">
          {!isLoading ? (
            <>
              <Button variant="contained" onClick={() => handleBack()}>
                VOLTAR
              </Button>
              <Button variant="contained" onClick={() => confirmSubmit()}>
                CONFIRMAR
              </Button>{" "}
            </>
          ) : (
            <div className="createPallete__lottie">
              <Lottie
                options={loadingOptions}
                width={120}
                height={30}
                isClickToPauseDisabled={true}
                speed={3}
              />
            </div>
          )}
        </div>
      </Step3Container>
    </motion.div>
  );
};

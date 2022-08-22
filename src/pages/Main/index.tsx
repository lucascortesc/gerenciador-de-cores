import { Button } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Lottie from "react-lottie";
import { useHistory } from "react-router-dom";
import { Header } from "../../components/Header";
import { Modal } from "../../components/Modal";
import { FormStep1 } from "../../components/PaletteForm/step1";
import { FormStep2 } from "../../components/PaletteForm/step2";
import { Palettes } from "../../components/Palettes";
import animatedLoading from "../../lottie/41343-4-color-circles-loading.json";
import { usePalettes } from "../../Providers/Palettes";
import { MainCointainer } from "./styled";

export const Main = () => {
  const history = useHistory();

  const { palettes, getPalettes, createPalette, setColors } = usePalettes();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const loading = async () => {
      if (!token) {
        history.push("/login");
      } else {
        setIsLoading(true);
        await getPalettes();
        setIsLoading(false);
      }
    };

    loading();
  }, []);

  const loadingOptions = {
    loop: true,
    autoplay: true,
    animationData: animatedLoading,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const renderForm = () => {
    switch (createPalette.step) {
      case 1:
        return <FormStep1 title={"Nome da paleta"} />;
      case 2:
        return <FormStep2 setOpenModal={setOpenModal} title={"Criando cores"} />;

      default:
        return <></>;
    }
  };

  const initialColor = () => {
    setColors([{ name: " ", rgba: "255,255,255,1", hex: "#fff", isDark: false }]);
    setOpenModal(true);
  };

  return (
    <>
      {openModal && <Modal setOpenModal={setOpenModal}>{renderForm()}</Modal>}
      <Header />
      <MainCointainer>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <Button onClick={() => initialColor()} variant="contained" className="main__addPalette">
            CRIAR PALETA
          </Button>
          {isLoading ? (
            <div className="main__lottie-container">
              <Lottie
                options={loadingOptions}
                width={120}
                height={30}
                isClickToPauseDisabled={true}
                speed={3}
              />
            </div>
          ) : palettes.length === 0 ? (
            <div className="main__container-noPalletes">
              <p className="main__noPalettes">Você ainda não criou nenhuma paleta de cores</p>{" "}
            </div>
          ) : (
            <Palettes></Palettes>
          )}
        </motion.div>
      </MainCointainer>
    </>
  );
};

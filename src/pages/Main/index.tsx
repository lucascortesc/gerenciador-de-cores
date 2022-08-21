import { Button } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { FormStep1 } from "../../components/CreatePaletteForm/step1";
import { FormStep2 } from "../../components/CreatePaletteForm/step2";
import { Header } from "../../components/Header";
import { Modal } from "../../components/Modal";
import { usePalettes } from "../../Providers/Palettes";
import { MainCointainer } from "./styled";

export const Main = () => {
  const history = useHistory();

  const { palettes, getPalettes, createPalette } = usePalettes();
  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      history.push("/login");
    } else {
      getPalettes();
    }
  }, []);

  const renderForm = () => {
    switch (createPalette.step) {
      case 1:
        return <FormStep1 />;
      case 2:
        return <FormStep2 setOpenModal={setOpenModal} />;

      default:
        return <></>;
    }
  };

  return (
    <>
      {openModal && <Modal setOpenModal={setOpenModal}>{renderForm()}</Modal>}
      <Header />
      <MainCointainer>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <Button onClick={() => setOpenModal(true)} variant="contained" className="main__addPalette">
            CRIAR PALETA
          </Button>
          {palettes.length === 0 ? (
            <div className="main__container-noPalletes">
              <p className="main__noPalettes">Você ainda não criou nenhuma paleta de cores</p>{" "}
            </div>
          ) : (
            <></>
          )}
        </motion.div>
      </MainCointainer>
    </>
  );
};

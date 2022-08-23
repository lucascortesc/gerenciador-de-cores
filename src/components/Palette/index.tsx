import { Button } from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaRegEdit, FaTrash } from "react-icons/fa";
import Lottie from "react-lottie";
import { IPalette } from "../../interfaces";
import animatedLoading from "../../lottie/41343-4-color-circles-loading.json";
import { usePalettes } from "../../Providers/Palettes";
import { Modal } from "../Modal";
import { FormStep1 } from "../PaletteForm/step1";
import { FormStep2 } from "../PaletteForm/step2";
import { FormStep3 } from "../PaletteForm/step3";
import { Container } from "./styled";

interface Props {
  palette: IPalette;
}

export const Palette: React.FC<Props> = ({ palette }) => {
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [openModalUpdate, setOpenModalUpdate] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { deletePalette, createPalette, setCreatePalette, setColors, isDark } = usePalettes();

  const loadingOptions = {
    loop: true,
    autoplay: true,
    animationData: animatedLoading,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleClickCopy = (color: string) => {
    navigator.clipboard.writeText(color);
    toast.success("Cor copiada");
  };

  const handleClickDelete = async () => {
    if (palette.id) {
      setIsLoading(true);
      const res = await deletePalette(palette.id);

      if (res.error) {
        toast.error(res.error);
        setIsLoading(false);
      } else {
        toast.success(res.success!);
        setOpenModalDelete(false);
      }
    }
  };

  const renderForm = () => {
    switch (createPalette.step) {
      case 1:
        return <FormStep1 title={"Editar nome da paleta"} />;
      case 2:
        return <FormStep2 setOpenModal={setOpenModalUpdate} title={"Editando cores"} />;
      case 3:
        return <FormStep3 setOpenModal={setOpenModalUpdate} title={"Editando cores"} />;

      default:
        return <></>;
    }
  };

  const handleClickUpdate = () => {
    setCreatePalette({ ...palette, step: 1 });

    setColors(palette.colors);

    setOpenModalUpdate(true);
  };

  return (
    <>
      {openModalUpdate && <Modal setOpenModal={setOpenModalUpdate}>{renderForm()}</Modal>}
      <Container>
        {openModalDelete && (
          <Modal setOpenModal={setOpenModalDelete}>
            <>
              <p className="modal__excluir-title">Deseja exlcuir a paleta?</p>
              {!isLoading ? (
                <div className="modal__excluir-buttons">
                  <Button onClick={() => setOpenModalDelete(false)} variant="contained">
                    CANCELAR
                  </Button>
                  <Button
                    onClick={() => handleClickDelete()}
                    variant="contained"
                    style={{
                      background: "red",
                    }}
                  >
                    CONFIRMAR
                  </Button>
                </div>
              ) : (
                <div style={{ marginTop: "20px" }}>
                  <Lottie
                    options={loadingOptions}
                    width={120}
                    height={30}
                    isClickToPauseDisabled={true}
                    speed={3}
                  />
                </div>
              )}
            </>
          </Modal>
        )}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="palette__container"
        >
          <div className="palette__title">
            <div></div>
            <p className="palette__name">{palette.name}</p>
            <div className="palette__icons">
              <FaRegEdit
                size={"14px"}
                cursor={"pointer"}
                color={"#303030"}
                onClick={() => handleClickUpdate()}
                className="palette_editIcon"
              />
              <FaTrash
                size={"14px"}
                cursor={"pointer"}
                color={"#303030"}
                onClick={() => setOpenModalDelete(true)}
              />
            </div>
          </div>
          <div className="palette__card">
            {palette.colors.map((color, index) => {
              return (
                <div
                  className="palette__card-color"
                  style={{ background: color.hex }}
                  key={`${color.hex}${index}`}
                  onClick={() => handleClickCopy(color.hex)}
                >
                  <div className="palette__desc" style={{ color: isDark(color) }}>
                    <p>{color.name}</p>
                    <p>{color.hex}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </Container>
    </>
  );
};

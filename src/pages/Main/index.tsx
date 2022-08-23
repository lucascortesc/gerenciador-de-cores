import { Button, InputAdornment, TextField } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaSearch } from "react-icons/fa";
import Lottie from "react-lottie";
import { useHistory } from "react-router-dom";
import { Header } from "../../components/Header";
import { Modal } from "../../components/Modal";
import { FormStep1 } from "../../components/PaletteForm/step1";
import { FormStep2 } from "../../components/PaletteForm/step2";
import { FormStep3 } from "../../components/PaletteForm/step3";
import { Palettes } from "../../components/Palettes";
import { IColor, IPalette } from "../../interfaces";
import animatedLoading from "../../lottie/41343-4-color-circles-loading.json";
import { usePalettes } from "../../Providers/Palettes";
import { MainCointainer } from "./styled";

export const Main = () => {
  const history = useHistory();

  const { palettes, getPalettes, createPalette, setColors, postPalette } = usePalettes();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingButtons, setIsLoadingButtons] = useState<boolean>(false);
  const [searchField, setSearchField] = useState<string>("");

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
      case 3:
        return <FormStep3 setOpenModal={setOpenModal} title={"Criando cores"} />;
      default:
        return <></>;
    }
  };

  const initialColor = () => {
    setColors([{ name: " ", rgba: "255,255,255,1", hex: "#fff", isDark: false }]);
    setOpenModal(true);
  };

  const filterPalettes = () => {
    const searchToLowerCase = searchField
      .toLowerCase()
      .normalize("NFD")
      .replace(/[^a-zA-Zs]/g, "");

    const filter = palettes.filter((palette) => {
      return palette.name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[^a-zA-Zs]/g, "")
        .includes(searchToLowerCase);
    });

    if (filter.length > 0) {
      return filter;
    }
    return palettes;
  };

  const createRandomPalette = async () => {
    const qtdPaletta = Math.floor(Math.random() * (7 - 2 + 1)) + 2;

    const colors: IColor[] = [];

    for (let i = 0; i < qtdPaletta; i++) {
      const r = Math.floor(Math.random() * 255);
      const g = Math.floor(Math.random() * 255);
      const b = Math.floor(Math.random() * 255);

      const rgba = `${r},${g},${b},1`;
      const hex = rgbToHex(r, g, b);

      colors[i] = { name: " ", rgba, hex };
    }

    setIsLoadingButtons(true);
    const palette: IPalette = {
      colors,
      name: "Paleta Aleatória",
    };
    const res = await postPalette(palette);
    if (res.error) {
      toast.error(res.error);
      setIsLoadingButtons(false);
    } else {
      toast.success("Paleta criada com sucesso");
    }
    setIsLoadingButtons(false);
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    let StringR = r.toString(16);
    let StringG = g.toString(16);
    let StringB = b.toString(16);

    StringR = StringR.length === 1 ? "0" + StringR : StringR;
    StringG = StringG.length === 1 ? "0" + StringG : StringG;
    StringB = StringB.length === 1 ? "0" + StringB : StringB;

    return "#" + StringR + StringG + StringB;
  };

  return (
    <>
      {openModal && <Modal setOpenModal={setOpenModal}>{renderForm()}</Modal>}
      <Header />
      <MainCointainer>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <div className="main__container-optionals">
            <div className="main__container-Buttons">
              {isLoadingButtons ? (
                <Lottie
                  options={loadingOptions}
                  width={120}
                  height={30}
                  isClickToPauseDisabled={true}
                  speed={3}
                />
              ) : (
                <>
                  <Button onClick={() => initialColor()} variant="contained" className="main__addPalette">
                    CRIAR PALETA
                  </Button>
                  <Button
                    onClick={() => createRandomPalette()}
                    variant="contained"
                    className="main__addPalette"
                  >
                    CRIAR PALETA ALEATÓRIA
                  </Button>
                </>
              )}
            </div>
            <TextField
              id="input-with-icon-textfield"
              label="Busque uma paleta"
              onChange={(e) => setSearchField(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <FaSearch />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            />
          </div>
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
            <Palettes filtredPalettes={filterPalettes()}></Palettes>
          )}
        </motion.div>
      </MainCointainer>
    </>
  );
};

import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField } from "@mui/material";
import { ReactNode, useState } from "react";
import { ChromePicker, ColorResult } from "react-color";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import Lottie from "react-lottie";
import { formColor, IColor, IColorBrithness, IPalette } from "../../interfaces";
import animatedLoading from "../../lottie/41343-4-color-circles-loading.json";
import { usePalettes } from "../../Providers/Palettes";
import { Step2Schema } from "../../validation";
import { Cover, Step2Container } from "./styled";

interface Props {
  setOpenModal: (value: boolean) => void;
}

export const FormStep2: React.FC<Props> = ({ setOpenModal }) => {
  const { createPalette, setCreatePalette, postPalette } = usePalettes();
  const [renderPicker, setRenderPicker] = useState<boolean>(false);
  const [colors, setColors] = useState<IColorBrithness[]>([
    { name: " ", rgba: "255,255,255,1", hex: "#fff", isDark: false },
  ]);
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({ resolver: yupResolver(Step2Schema) });

  const loadingOptions = {
    loop: true,
    autoplay: true,
    animationData: animatedLoading,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleColorClick = (index: number) => {
    setRenderPicker(!renderPicker);
  };

  let pickedColor: ColorResult;

  const handleClosePicker = (e: any, index: number) => {
    if (e.target.id === "cover") {
      if (pickedColor) {
        const rgba = `${pickedColor.rgb.r},${pickedColor.rgb.g},${pickedColor.rgb.b},${pickedColor.rgb.a}`;
        const newColors = [...colors];

        const brightness =
          (pickedColor.rgb.r * 299 + pickedColor.rgb.g * 587 + pickedColor.rgb.b * 114) / 1000;

        const isDark = brightness > 128 ? false : true;

        newColors[index] = { name: colors[index].name, hex: pickedColor.hex, rgba, isDark };

        setColors(newColors);
      }

      setRenderPicker(!renderPicker);
    }
  };

  const handleChangeComplete = (color: ColorResult) => {
    pickedColor = color;
  };

  const handleChangeName = (name: string, index: number) => {
    if (!name) {
      name = " ";
    }

    const newName = [...colors];
    newName[index] = { name, rgba: colors[index].rgba, hex: colors[index].hex, isDark: colors[index].isDark };
    console.log(newName);
    setColors(newName);
  };

  const handleAddColor = () => {
    setColors([...colors, { name: " ", rgba: "255,255,255,1", hex: "#fff", isDark: false }]);
  };

  const handleDelete = (index: number) => {
    setColors(colors.filter((e, i) => i !== index));
  };

  const onSubmit = async (data: formColor) => {
    setLoading(true);
    const name = createPalette.name || " ";

    const palette: IPalette = {
      colors,
      name,
    };

    const res = await postPalette(palette);

    if (res.error) {
      toast.error(res.error);
      setLoading(false);
    } else {
      toast.success("Paleta criada com sucesso");
      createPalette.step = 1;
      setOpenModal(false);
    }
  };

  return (
    <>
      <Step2Container>
        <p className="step2__title">Criando cores</p>
        <div className="step2__container-button">
          <Button disabled={colors.length === 10} variant="contained" onClick={() => handleAddColor()}>
            Adicionar Cor
          </Button>
        </div>
        <div className="step2__headerSeparator" />
        <form className="step2__form">
          {colors.map((color: IColor, index: number) => {
            return (
              <div className="step2__container-color" key={index}>
                <div>
                  <TextField
                    sx={{ width: "100%" }}
                    id={`name${index + 1}`}
                    label="Nome"
                    variant="filled"
                    {...register(`name${index + 1}`)}
                    error={!!errors[`name${index + 1}`]}
                    key={`input${index}`}
                    onChange={(e) => handleChangeName(e.target.value, index)}
                  />
                  <span className="erro">{errors[`name${index + 1}`]?.message as ReactNode}</span>
                </div>
                <div className="step2__conteinar-delete">
                  <Button
                    onClick={() => handleColorClick(index)}
                    key={`button${index}`}
                    style={{
                      background: colors[index]?.hex,
                      color: colors[index].isDark ? "white" : "black",
                    }}
                  >
                    SELECIONAR COR
                  </Button>
                  <FaTrash cursor={"pointer"} color={"#757575"} onClick={() => handleDelete(index)} />
                </div>
                {renderPicker && (
                  <Cover onClick={(e) => handleClosePicker(e, index)} id={"cover"} key={`cover${index}`}>
                    <div className="popover">
                      <ChromePicker onChangeComplete={(color) => handleChangeComplete(color)} />
                    </div>
                  </Cover>
                )}
              </div>
            );
          })}
          {!loading ? (
            <Button disabled={colors.length === 0} onClick={handleSubmit(onSubmit)} variant="contained">
              AVANÇAR
            </Button>
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
        </form>
      </Step2Container>
    </>
  );
};

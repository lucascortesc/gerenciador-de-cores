import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField } from "@mui/material";
import { motion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";
import { ChromePicker, ColorResult } from "react-color";
import { useForm } from "react-hook-form";
import { FaTrash } from "react-icons/fa";
import { formColor, IColor } from "../../interfaces";
import { usePalettes } from "../../Providers/Palettes";
import { Step2Schema } from "../../validation";
import { Cover, Step2Container } from "./styled";

interface Props {
  setOpenModal: (value: boolean) => void;
  title: string;
}

export const FormStep2: React.FC<Props> = ({ setOpenModal, title }) => {
  const { createPalette, colors, setColors, setCreatePalette, isDark } = usePalettes();
  const [renderPicker, setRenderPicker] = useState<boolean[]>([]);

  useEffect(() => {
    let aux: boolean[] = [];

    for (let i = 0; i < 10; i++) {
      aux[i] = false;
    }

    setRenderPicker(aux);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formColor>({ resolver: yupResolver(Step2Schema) });

  const handleColorClick = (index: number) => {
    const aux = [...renderPicker];
    aux[index] = !aux[index];

    setRenderPicker(aux);
  };

  let pickedColor: ColorResult;

  const handleConfirmPicker = (index: number) => {
    if (pickedColor) {
      const rgba = `${pickedColor.rgb.r},${pickedColor.rgb.g},${pickedColor.rgb.b},${pickedColor.rgb.a}`;
      const newColors = [...colors];

      newColors[index] = { name: colors[index].name, hex: pickedColor.hex, rgba };

      setColors(newColors);
    }

    const aux = [...renderPicker];
    aux[index] = !aux[index];

    setRenderPicker(aux);
  };

  const handleChangeComplete = (color: ColorResult, index: number) => {
    pickedColor = color;
  };

  const handleChangeName = (name: string, index: number) => {
    if (!name) {
      name = " ";
    }

    const newName = [...colors];
    newName[index] = { name, rgba: colors[index].rgba, hex: colors[index].hex };
    setColors(newName);
  };

  const handleAddColor = () => {
    setColors([...colors, { name: " ", rgba: "255,255,255,1", hex: "#fff" }]);
  };

  const handleDelete = (index: number) => {
    setColors(colors.filter((e, i) => i !== index));
  };

  const handleBack = () => {
    setCreatePalette({ ...createPalette, step: 1 });
  };

  const onSubmit = async (data: formColor) => {
    setCreatePalette({ ...createPalette, step: 3, colors });
  };

  return (
    <motion.div initial={{ opacity: 0.5 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Step2Container>
        <p className="step2__title">{title}</p>
        <div className="step2__container-button">
          <Button disabled={colors.length === 7} variant="contained" onClick={() => handleAddColor()}>
            Adicionar Cor
          </Button>
        </div>
        <div className="step2__headerSeparator" />
        <form className="step2__form">
          {colors.map((color: IColor, index: number) => {
            return (
              <div className="step2__container-color" key={index}>
                <div>
                  <div>
                    <TextField
                      id={`name${index + 1}`}
                      label="Nome"
                      variant="standard"
                      {...register(`name${index + 1}`)}
                      error={!!errors[`name${index + 1}`]}
                      key={`input${index}`}
                      defaultValue={color.name && color.name}
                      onChange={(e) => handleChangeName(e.target.value, index)}
                    />
                  </div>
                  <span className="erro">{errors[`name${index + 1}`]?.message as ReactNode}</span>
                </div>
                <div className="step2__conteinar-delete">
                  <Button
                    onClick={() => handleColorClick(index)}
                    key={`button${index}`}
                    style={{
                      background: colors[index]?.hex,
                      color: isDark(color),
                      marginRight: "10px",
                      border: "1px solid black",
                    }}
                  >
                    SELECIONAR COR
                  </Button>
                  <FaTrash cursor={"pointer"} color={"#757575"} onClick={() => handleDelete(index)} />
                </div>
                {renderPicker[index] && (
                  <Cover id={"cover"} key={`cover${index}`}>
                    <div className="popover">
                      <ChromePicker
                        onChangeComplete={(color) => handleChangeComplete(color, index)}
                        color={color.hex}
                      />
                    </div>
                    <div className="cover__buttons">
                      <Button
                        variant="contained"
                        style={{ background: "red", color: "white" }}
                        onClick={() => handleColorClick(index)}
                      >
                        CANCELAR
                      </Button>
                      <Button
                        variant="contained"
                        style={{ color: "white" }}
                        onClick={() => handleConfirmPicker(index)}
                      >
                        OK
                      </Button>
                    </div>
                  </Cover>
                )}
              </div>
            );
          })}
          <div className="step2__container-buttons">
            <Button onClick={() => handleBack()} variant="contained">
              VOLTAR
            </Button>
            <Button disabled={colors.length < 2} onClick={handleSubmit(onSubmit)} variant="contained">
              AVANÇAR
            </Button>
          </div>
        </form>
      </Step2Container>
    </motion.div>
  );
};

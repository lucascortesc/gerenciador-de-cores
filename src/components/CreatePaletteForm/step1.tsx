import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { IStep1 } from "../../interfaces";
import { usePalettes } from "../../Providers/Palettes";
import { Step1Schema } from "../../validation";
import { Step1Container } from "./styled";

export const FormStep1 = () => {
  const { setCreatePalette } = usePalettes();

  const onSubmit = (data: IStep1) => {
    setCreatePalette({ step: 2, ...data });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IStep1>({ resolver: yupResolver(Step1Schema) });
  return (
    <Step1Container>
      <p className="step1__title">Nome da paleta</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          id="name"
          label="Nome"
          variant="outlined"
          {...register("name")}
          error={!!errors.name}
          fullWidth
        />
        <span className="erro">{errors.name?.message}</span>
        <Button variant="contained" type={"submit"}>
          AVANÇAR
        </Button>
      </form>
    </Step1Container>
  );
};

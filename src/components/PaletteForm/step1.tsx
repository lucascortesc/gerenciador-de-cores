import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField } from "@mui/material";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { IStep1 } from "../../interfaces";
import { usePalettes } from "../../Providers/Palettes";
import { Step1Schema } from "../../validation";
import { Step1Container } from "./styled";

interface Props {
  title: string;
}

export const FormStep1: React.FC<Props> = ({ title }) => {
  const { setCreatePalette, createPalette } = usePalettes();

  const onSubmit = (data: IStep1) => {
    if (title === "Nome da paleta") {
      setCreatePalette({ step: 2, ...data });
    } else {
      setCreatePalette({ step: 2, ...data, id: createPalette.id });
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IStep1>({ resolver: yupResolver(Step1Schema) });
  return (
    <motion.div initial={{ opacity: 0.5 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Step1Container>
        <p className="step1__title">{title}</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            id="name"
            label="Nome"
            variant="outlined"
            {...register("name")}
            error={!!errors.name}
            defaultValue={createPalette.name && createPalette.name}
            fullWidth
          />
          <span className="erro">{errors.name?.message}</span>
          <Button variant="contained" type={"submit"}>
            AVANÇAR
          </Button>
        </form>
      </Step1Container>
    </motion.div>
  );
};

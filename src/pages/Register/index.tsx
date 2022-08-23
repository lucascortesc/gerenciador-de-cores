import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Lottie from "react-lottie";
import { useHistory } from "react-router-dom";
import { IRegisterSchema } from "../../interfaces";
import animatedLoading from "../../lottie/41343-4-color-circles-loading.json";
import { useUser } from "../../Providers/User";
import { RegisterSchema } from "../../validation";
import { Background } from "./styled";

export const Register = () => {
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      history.push("/main");
    }
  }, []);

  const [visible, setVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const loadingOptions = {
    loop: true,
    autoplay: true,
    animationData: animatedLoading,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterSchema>({ resolver: yupResolver(RegisterSchema) });

  const { registerUser } = useUser();

  const onSubmit = async (data: IRegisterSchema) => {
    setLoading(true);

    const user = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    const res = await registerUser(user);

    if (res.error) {
      toast.error(res.error);
      setLoading(false);
    } else {
      toast.success(res.success!);
      setTimeout(() => {
        history.push("/login");
      }, 1500);
    }
  };

  return (
    <Background>
      <motion.div
        initial={{ opacity: 0, y: -200 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="register__container"
      >
        <div className="register__header">
          <h1>Cadastro</h1>
          {!loading && <p onClick={() => history.push("/")}>x</p>}
        </div>
        <div className="register__container-form">
          <form className="register__form" onSubmit={handleSubmit(onSubmit)}>
            <div className="register__icons-container">
              <TextField
                id="name"
                label="Nome"
                variant="standard"
                {...register("name")}
                error={!!errors.name}
                fullWidth
              />
              <div className="register__icon">
                <FaUser size={"18px"} />
              </div>
            </div>
            <span className="erro">{errors.name?.message}</span>
            <div className="register__icons-container">
              <TextField
                id="email"
                label="Email"
                variant="standard"
                {...register("email")}
                error={!!errors.email}
                fullWidth
              />
              <div className="register__icon">
                <MdEmail size={"18px"} />
              </div>
            </div>
            <span className="erro">{errors.email?.message}</span>
            <div className="register__icons-container">
              <TextField
                id="password"
                label="Senha"
                variant="standard"
                type={!visible ? "password" : "text"}
                {...register("password")}
                error={!!errors.password}
                fullWidth
              />
              <div onClick={() => setVisible(!visible)} className="register__icon">
                {!visible ? (
                  <AiFillEye size={"18px"} cursor={"pointer"} />
                ) : (
                  <AiFillEyeInvisible size={"18px"} cursor={"pointer"} />
                )}
              </div>
            </div>
            <span className="erro">{errors.password?.message}</span>
            <div className="register__icons-container">
              <TextField
                id="confirmPassword"
                label="Confirmar Senha"
                variant="standard"
                type={!visible ? "password" : "text"}
                {...register("confirmPassword")}
                error={!!errors.confirmPassword}
                fullWidth
              />
            </div>
            <span className="erro">{errors.confirmPassword?.message}</span>
            {!loading ? (
              <Button type="submit">Cadastrar</Button>
            ) : (
              <div className="register__lottie">
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
          <div className="register__login">
            <p>Já possui uma conta?</p>
            <p className="register__redirect" onClick={() => history.push("/login")}>
              Entrar
            </p>
          </div>
        </div>
      </motion.div>
    </Background>
  );
};

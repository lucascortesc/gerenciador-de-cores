import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import Lottie from "react-lottie";
import { useHistory } from "react-router-dom";
import { IUserLogin } from "../../interfaces";
import animatedLoading from "../../lottie/41343-4-color-circles-loading.json";
import { useUser } from "../../Providers/User";
import { LoginSchema } from "../../validation";
import { Background } from "./styled";

export const Login = () => {
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
  } = useForm<IUserLogin>({ resolver: yupResolver(LoginSchema) });

  const { signIn } = useUser();

  const onSubmit = async (data: IUserLogin) => {
    setLoading(true);
    const res = await signIn(data);

    if (res.error) {
      toast.error(res.error);
      setLoading(false);
    } else {
      toast.success(res.success!);
      setTimeout(() => {
        history.push("/main");
      }, 1500);
    }
  };

  return (
    <Background>
      <motion.div
        initial={{ opacity: 0, y: -200 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="login__container"
      >
        <div className="login__header">
          <h1>Login</h1>
          {!loading && <p onClick={() => history.push("/")}>x</p>}
        </div>
        <div className="login__container-form">
          <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
            <div className="login__icons-container">
              <TextField
                id="email"
                label="Email"
                variant="standard"
                {...register("email")}
                error={!!errors.email}
                fullWidth
              />
              <div className="login__icon">
                <MdEmail size={"22px"} />
              </div>
            </div>
            <span className="erro">{errors.email?.message}</span>
            <div className="login__icons-container">
              <TextField
                id="password"
                label="Senha"
                variant="standard"
                type={!visible ? "password" : "text"}
                {...register("password")}
                error={!!errors.password}
                fullWidth
              />
              <div onClick={() => setVisible(!visible)} className="login__icon">
                {!visible ? (
                  <AiFillEye size={"22px"} cursor={"pointer"} />
                ) : (
                  <AiFillEyeInvisible size={"22px"} cursor={"pointer"} />
                )}
              </div>
            </div>
            <span className="erro">{errors.password?.message}</span>
            {!loading ? (
              <Button type="submit">Entrar</Button>
            ) : (
              <div className="login__lottie">
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
          <div className="login__register">
            <p>Ainda não tem uma conta?</p>
            <p className="login__redirect" onClick={() => history.push("/register")}>
              Cadastre-se!
            </p>
          </div>
        </div>
      </motion.div>
    </Background>
  );
};

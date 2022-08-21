import { Button } from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";
import { useHistory } from "react-router-dom";
import { useUser } from "../../Providers/User";
import logo from "./assets/logo.png";
import { Background } from "./styled";

export const Header = () => {
  const [rotate, setRotate] = useState<boolean>(false);
  const [windowSize, setWindowSize] = useState<number>(window.innerWidth);
  const history = useHistory();

  const { user } = useUser();

  window.addEventListener("resize", () => {
    setWindowSize(window.innerWidth);
  });

  const logout = () => {
    localStorage.clear();
    toast.success("Logout feito com sucesso");
    setTimeout(() => {
      history.push("/");
    }, 1500);
  };

  return (
    <Background>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="header__container"
      >
        <img
          src={`${logo}`}
          alt="logo"
          className={rotate ? "header__logo rotate" : "header__logo"}
          id={windowSize < 480 ? "invisible" : ""}
          onMouseEnter={() => setRotate(true)}
          onMouseLeave={() => setRotate(false)}
        />
        <p className="header__wellcome">{user.name}</p>
        <Button onClick={logout}>Logout</Button>
      </motion.div>
    </Background>
  );
};

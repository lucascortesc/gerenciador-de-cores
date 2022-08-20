import Button from "@mui/material/Button";
import { motion } from "framer-motion";
import { useState } from "react";
import Lottie from "react-lottie";
import { useHistory } from "react-router-dom";
import animatedWheel from "../../lottie/87422-color-wheel.json";
import { Background } from "./styled";

export const Dashboard = () => {
  const [speed, setSpeed] = useState<number>(1);
  const [windowSize, setWindowSize] = useState<number>(window.innerWidth);

  const history = useHistory();

  window.addEventListener("resize", () => {
    setWindowSize(window.innerWidth);
  });

  const palletOptions = {
    loop: true,
    autoplay: true,
    animationData: animatedWheel,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Background>
      {windowSize > 1119 ? (
        <div className="dashboard__container-content">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="dashboard__wellcomeText"
          >
            <div className="dashboard__flexContainer">
              <h1>GERENCIADOR DE CORES</h1>
              <h2>Salve suas paletas de cores favoritas</h2>
              <Button onClick={() => history.push("/login")}>ENTRAR</Button>
            </div>
          </motion.div>
          <div
            className="dashboard__container-lottie"
            onMouseEnter={() => setSpeed(2)}
            onMouseLeave={() => setSpeed(1)}
          >
            <Lottie options={palletOptions} isClickToPauseDisabled={true} speed={speed} />
          </div>
        </div>
      ) : (
        <div className="dashboard__container-content">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="dashboard__wellcomeText"
          >
            <div className="dashboard__flexContainer">
              <h1>GERENCIADOR DE CORES</h1>
              <h2>Salve suas paletas de cores favoritas</h2>
            </div>
            <div
              className="dashboard__container-lottie"
              onMouseEnter={() => setSpeed(2)}
              onMouseLeave={() => setSpeed(1)}
            >
              <Lottie options={palletOptions} isClickToPauseDisabled={true} speed={speed} />
            </div>
            <Button onClick={() => history.push("/login")}>ENTRAR</Button>
          </motion.div>
        </div>
      )}
    </Background>
  );
};

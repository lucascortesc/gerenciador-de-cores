import { motion } from "framer-motion";
import React from "react";
import { Background } from "./styled";

interface Props {
  setOpenModal: (value: boolean) => void;
  children: JSX.Element;
}

export const Modal: React.FC<Props> = ({ setOpenModal, children }) => {
  return (
    <Background>
      <motion.div
        initial={{ opacity: 0.7, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="modal__body"
      >
        <div className="modal__close">
          <p onClick={() => setOpenModal(false)}>x</p>
        </div>
        {children}
      </motion.div>
    </Background>
  );
};

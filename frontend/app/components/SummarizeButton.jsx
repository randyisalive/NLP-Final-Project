import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSummarizeContext } from "../context/useSummarizeContext";

const SummarizeButton = ({
  status = false,
  onClickFunction = () => {},
  className = "",
  title = "",
  clickType = false,
  primaryColor = "#1A54E9",
  secondaryColor = "#C0C0C0",
}) => {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      whileHover={
        clickType
          ? { backgroundColor: primaryColor }
          : { backgroundColor: secondaryColor }
      }
      initial={{ backgroundColor: secondaryColor }}
      animate={
        status
          ? { backgroundColor: primaryColor }
          : { backgroundColor: secondaryColor }
      }
      className={
        !className &&
        ` cursor-pointer text-white font-[500] text-[16px]  py-[12px] px-[24px] rounded-[8px]`
      }
      style={{ boxShadow: " 0px 0px 15px 5px #1A54E91A" }}
      onClick={onClickFunction}
    >
      {title}
    </motion.button>
  );
};

export default SummarizeButton;

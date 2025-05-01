import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const SummarizeButton = ({ status = false }) => {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      initial={{ backgroundColor: "#C0C0C0" }}
      animate={
        status ? { backgroundColor: "#1A54E9" } : { backgroundColor: "#C0C0C0" }
      }
      className={` cursor-pointer text-white font-[500] text-[16px]  py-[12px] px-[24px] rounded-[8px]`}
      style={{ boxShadow: " 0px 0px 15px 5px #1A54E91A" }}
    >
      Summarize
    </motion.button>
  );
};

export default SummarizeButton;

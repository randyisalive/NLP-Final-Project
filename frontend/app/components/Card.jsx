"use client";
import React from "react";
import { motion } from "framer-motion";

const Card = ({ title = "Untitled Document" }) => {
  return (
    <motion.button
      whileHover={{ backgroundColor: "#EEEEEE" }}
      style={{ backgroundColor: "#FFFFFF" }}
      className="w-full rounded-[8px] cursor-pointer border p-[8px] gap-[10px] text-start border-[#F0F0F0] font-[400] text-[12px] text-[#3B3A3B]"
    >
      {title}
    </motion.button>
  );
};

export default Card;

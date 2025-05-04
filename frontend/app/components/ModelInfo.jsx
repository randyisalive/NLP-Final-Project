"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSummarizeContext } from "../context/useSummarizeContext";

const ModelInfo = ({ model_data = {}, visible = false }) => {
  const { closeInformation } = useSummarizeContext();
  return (
    <React.Fragment>
      <div className=" absolute left-0 top-0 backdrop-blur-[5px] w-screen h-screen bg-opacity-50 text-base"></div>
      <div className=" absolute left-0 top-0 flex justify-center    w-screen h-screen">
        <motion.div
          initial={{ y: "-100%" }}
          animate={{ y: 100 }}
          exit={{ y: "-100%" }}
          className=" text-black opacity-100 w-[640px] text-justify h-fit shadow bg-white p-[28px] border border-[#F0F0F0] rounded-[12px] flex flex-col gap-[10px]"
        >
          <div className=" flex flex-col gap-[8px]">
            <div className="flex w-full justify-between text-lg">
              <span className=" text-2xl">{model_data.title}</span>
              <motion.div
                whileHover={{ backgroundColor: "#EEEEEE" }}
                style={{ backgroundColor: "#FFFFFF" }}
                onClick={() => closeInformation(model_data.id)}
                className=" p-[5px] flex items-center cursor-pointer justify-center rounded-[10px]"
              >
                <i className="pi pi-times"></i>
              </motion.div>
            </div>
            <div className="w-full border"></div>
          </div>
          <p className=" text-[16px]">{model_data.information}</p>
        </motion.div>
      </div>
    </React.Fragment>
  );
};

export default ModelInfo;

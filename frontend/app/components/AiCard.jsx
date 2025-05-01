import React from "react";
import ModelInfo from "./ModelInfo";
import { useSummarizeContext } from "../context/useSummarizeContext";
import { AnimatePresence } from "framer-motion";

const AiCard = ({
  ai_title = "AI Title",
  sub = "Standard AI detection",
  checked = false,
  info_status = false,
  model_data = {},
}) => {
  const { closeInformation, selectModel } = useSummarizeContext();
  return (
    <div
      className={` flex py-[12px] px-[8px] gap-[10px] border   rounded-[8px] ${
        checked
          ? "shadow-md shadow-[#1A54E91A] border-[#1A54E9]"
          : "border-[#F0F0F0]"
      }`}
    >
      <AnimatePresence mode="wait">
        {info_status && <ModelInfo model_data={model_data} />}
      </AnimatePresence>

      <input
        type="radio"
        name="ai_model"
        checked={checked}
        onChange={() => selectModel(model_data.id)}
      />
      <div className=" flex flex-col ">
        <div className=" flex gap-[4px] items-center" id="card-header">
          <span className=" text-[14px] font-[500]">{ai_title}</span>
          <i
            onClick={() => closeInformation(model_data?.id)}
            className="pi pi-exclamation-circle text-[13px] cursor-pointer text-[#C0C0C0]"
          ></i>
        </div>

        <span className="text-[#C0C0C0] text-[12px] font-[400]">{sub}</span>
      </div>
    </div>
  );
};

export default AiCard;

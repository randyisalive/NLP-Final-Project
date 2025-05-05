import React from "react";
import AiCard from "./AiCard";
import SummarizeButton from "./SummarizeButton";
import { useSummarizeContext } from "../context/useSummarizeContext";
import bg_button from "./../../public/bx_sidebar.png";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { truncateString } from "../function/truncate_string";
import ModelStats from "./ModelStats";
import { useModelStatsContext } from "../context/useModelStatsContext";
import { useRougeScoresContext } from "../context/useRougeScoresContext";

const TextAreaBox = () => {
  const { form, handleForm, handleSidebar, summary, submitForm } =
    useSummarizeContext();
  const { model } = useModelStatsContext();
  const { modelSelected } = useRougeScoresContext();
  return (
    <div
      className="min-w-[1164px]   h-[852px]"
      style={{ boxShadow: "0px 0px 15px 0px #0000000D" }}
    >
      <div className="rounded-tl-[12px] rounded-tr-[12px] border border-[#F0F0F0] border-b-0 py-[16px] px-[24px] gap-[24px]">
        <div className="flex gap-[12px] items-center">
          <AnimatePresence>
            <motion.div
              initial={{ x: 0 }}
              exit={{ x: 0 }}
              whileHover={{ backgroundColor: "#EEEEEE" }}
              whileTap={{ backgroundColor: "#FFFFFF" }}
              className="w-fit p-[5px] rounded-[8px] cursor-pointer relative left-0"
              style={{ backgroundColor: "#FFFFFF" }}
              onClick={() => handleSidebar()}
            >
              <Image
                src={bg_button}
                width={24}
                height={24}
                alt="sidebar_image.jpg"
              />
            </motion.div>
          </AnimatePresence>
          <span className="text-[14px] font-[500]">
            {truncateString(summary.text ?? "Untitled Document", 50)}
          </span>
          <i className="pi pi-angle-down"></i>
        </div>
      </div>
      <div
        className="text-[14px] flex font-[400] border border-[#F0F0F0] rounded-bl-[12px] h-full"
        style={{ height: "calc(100% - 53px)" }}
      >
        <div className="w-full border-r break-words py-[32px] px-[24px] gap-[10px] h-full flex flex-col border-[#F0F0F0]">
          <textarea
            className="text-[#3B3A3B] placeholder:text-[#C0C0C0] focus:outline-0 resize-none  h-full w-full"
            placeholder="Paste your text here"
            value={form.input}
            name="input"
            onChange={(e) => handleForm(e)}
          />
        </div>
        <div className="w-[311px]  rounded-br-[12px] flex flex-col justify-between">
          <div className="flex flex-col py-[10px] px-[32px] gap-[10px]">
            <span className=" text-center font-[500] text-[14px] ">
              Scan Options
            </span>
            <div className="w-full  flex flex-col gap-[10px]">
              {model?.map((i) => {
                return (
                  <AiCard
                    key={i.id}
                    ai_title={i?.title}
                    checked={i?.id === modelSelected}
                    sub={i?.sub}
                    info_status={i?.info_status}
                    model_data={i}
                  />
                );
              })}
            </div>
          </div>
          <div className=" h-full flex justify-center items-center">
            <ModelStats />
          </div>

          <div className="border-t p-[12px] gap-[24px] flex flex-col border-[#F0F0F0] ">
            <div className="flex flex-col text-[14px] font-[400]">
              <span>{form?.input?.length} / 250 maximum character</span>
            </div>
            <SummarizeButton
              onClickFunction={() => submitForm(modelSelected)}
              status={form.input?.length > 0 ? true : false}
              clickType
              title="Summarize"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextAreaBox;

import React from "react";
import AiCard from "./AiCard";
import SummarizeButton from "./SummarizeButton";

const TextAreaBox = ({
  model = [],
  modelSelected = 0,
  form = {},
  handleForm = () => {},
}) => {
  return (
    <div
      className="min-w-[1164px]   h-[852px]"
      style={{ boxShadow: "0px 0px 15px 0px #0000000D" }}
    >
      <div className="rounded-tl-[12px] rounded-tr-[12px] border border-[#F0F0F0] border-b-0 py-[16px] px-[24px] gap-[24px]">
        <div className="flex gap-[12px] items-center">
          <span className="text-[14px] font-[500]">Untitled Document</span>
          <i className="pi pi-angle-down"></i>
        </div>
      </div>
      <div
        className="text-[14px] flex font-[400] border border-[#F0F0F0] rounded-bl-[12px] h-full"
        style={{ height: "calc(100% - 53px)" }}
      >
        <div className="w-[1500px] bg-red-100 border-r py-[32px] px-[24px] gap-[10px] h-full flex flex-col border-[#F0F0F0]">
          <textarea
            className="text-[#3B3A3B] placeholder:text-[#C0C0C0] focus:outline-0 resize-none  h-full w-full"
            placeholder="Paste your text here"
            value={form.input}
            name="input"
            onChange={(e) => handleForm(e)}
          />
          {JSON.stringify(form)}
        </div>
        <div className="w-full  rounded-br-[12px] flex flex-col justify-between">
          <div className="flex flex-col py-[10px] px-[32px] gap-[10px]">
            <span className=" text-center font-[500] text-[14px] ">
              Scan Options
            </span>
            <div className="w-full  flex flex-col gap-[10px]">
              {model.map((i) => {
                return (
                  <AiCard
                    ai_title={i.title}
                    checked={i.id === modelSelected}
                    sub={i.sub}
                  />
                );
              })}
            </div>
          </div>

          <div className="border-t p-[12px] gap-[24px] flex flex-col border-[#F0F0F0] ">
            <div className="flex flex-col text-[14px] font-[400]">
              <span>{form?.input.length} / 250 minimum character</span>
              <span>{} words</span>
            </div>
            <SummarizeButton status={form.input.length > 0 ? true : false} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextAreaBox;

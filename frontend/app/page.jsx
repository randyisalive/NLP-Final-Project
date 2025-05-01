"use client";
import Image from "next/image";
import useSummarizeData from "./hooks/useSummarizeData";
import { ProgressSpinner } from "primereact/progressspinner";
import bg_button from "../public/bx_sidebar.png";
import Card from "./components/Card";

import "primeicons/primeicons.css";
import AiCard from "./components/AiCard";
import SummarizeButton from "./components/SummarizeButton";
import TextAreaBox from "./components/TextAreaBox";
import ResultBox from "./components/ResultBox";

export default function Home() {
  const {
    summary,
    handleForm,
    submitForm,
    form,
    isLoading,
    rouge,
    model,
    modelSelected,
  } = useSummarizeData();
  return (
    <div className=" w-screen h-screen flex">
      <div className="w-[15%] min-w-[220px] border h-full py-[46px] px-[24px] border-[#EFEFEF] gap-[24px] flex flex-col">
        <div>
          <Image src={bg_button} width={24} height={24} />
        </div>
        <div className="flex flex-col gap-[16px]">
          <div className="flex flex-col gap-[8px]">
            <span className=" text-[12px] font-[500]">Today</span>
            <Card />
            <Card />
          </div>
          <div className="flex flex-col gap-[8px]">
            <span className=" text-[12px] font-[500]">Yesterday</span>
            <Card />
            <Card />
          </div>
        </div>
      </div>
      <div className=" w-[85%] overflow-y-auto py-[20px] px-[30px]">
        <TextAreaBox
          model={model}
          modelSelected={modelSelected}
          form={form}
          handleForm={handleForm}
        />
        <ResultBox />
      </div>
    </div>
  );
}

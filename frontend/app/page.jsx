"use client";
import "primeicons/primeicons.css";
import TextAreaBox from "./components/TextAreaBox";
import ResultBox from "./components/ResultBox";
import Sidebar from "./components/Sidebar";
import { SummarizeContextProvider } from "./context/useSummarizeContext";

export default function Home() {
  return (
    <SummarizeContextProvider>
      <div className=" w-screen h-screen flex">
        <Sidebar />
        <div className=" w-[100%] overflow-y-auto py-[20px] px-[30px]">
          <TextAreaBox />
          <ResultBox />
        </div>
      </div>
    </SummarizeContextProvider>
  );
}

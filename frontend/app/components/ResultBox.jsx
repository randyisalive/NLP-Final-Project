import React from "react";
import { useSummarizeContext } from "../context/useSummarizeContext";
import { ProgressSpinner } from "primereact/progressspinner";

const ResultBox = () => {
  const { isLoading, summary } = useSummarizeContext();
  return (
    <React.Fragment>
      {isLoading === 0 && <></>}
      {isLoading === 1 && (
        <>
          <div className="my-5 flex justify-center items-center">
            <ProgressSpinner />
          </div>
        </>
      )}
      {isLoading === 2 && (
        <div
          className=" my-5 min-w-[1164px] flex flex-col gap-[10px] bg-white rounded-[12px] py-[16px] px-[24px] border border-[#F0F0F0]"
          style={{ boxShadow: " 0px 0px 15px 0px #0000000D" }}
        >
          <span className=" font-[500] text-[14px]">Text Summary</span>
          <div className="w-full rounded-[8px] border py-[12px] px-[8px] gap-[10px] text-[14px] font-[400] break-words border-[#F0F0F0]">
            {summary.summary}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default ResultBox;

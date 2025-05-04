"use client";
import React from "react";
import Card from "./Card";
import PencilSvg from "./icons/PencilSvg";
import { motion } from "framer-motion";
import { useSummarizeContext } from "../context/useSummarizeContext";
import { truncateString } from "../function/truncate_string";
import Link from "next/link";

const Sidebar = () => {
  const { sidebar, handleSidebar, chats } = useSummarizeContext();
  return (
    <motion.div
      initial={{ width: "300px" }}
      animate={
        sidebar
          ? { width: "0px", paddingLeft: 0, paddingRight: 0 }
          : { width: "300px" }
      }
      className={` border overflow-y-auto h-full py-[46px] px-[24px]  overflow-hidden border-[#EFEFEF] gap-[24px] flex flex-col `}
    >
      <div
        className={`flex flex-col gap-[16px] h-full min-w-[200px] overflow-y-auto`}
      >
        <div className="flex flex-col gap-[16px] ">
          {chats && (
            <React.Fragment>
              <div className="flex flex-col gap-[8px]">
                <span className=" text-[12px] font-[500]">Today</span>
                {chats.data?.today?.map((i) => {
                  return <Card card_data={i} />;
                })}
              </div>

              <div className="flex flex-col gap-[8px]">
                <span className=" text-[12px] font-[500]">Yesterday</span>
                {chats.data?.other_time?.map((i) => {
                  return <Card card_data={i} />;
                })}
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
      <motion.button
        whileHover={{ backgroundColor: "#EEEEEE" }}
        whileTap={{ scale: 0.9 }}
        style={{ backgroundColor: "#FFFFFF" }}
        className={`py-[12px]  px-[24px] cursor-pointer min-w-[180px] flex items-center justify-center border border-[#F0F0F0] rounded-[8px] gap-[8px]`}
      >
        <PencilSvg />
        <Link href={"/"}>
          <label
            htmlFor="new_session"
            className="font-[500] text-[14px] cursor-pointer"
          >
            New Session
          </label>
        </Link>
      </motion.button>
    </motion.div>
  );
};

export default Sidebar;

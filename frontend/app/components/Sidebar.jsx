"use client";
import Image from "next/image";
import React, { useState } from "react";
import Card from "./Card";
import bg_button from "./../../public/bx_sidebar.png";
import PencilSvg from "./icons/PencilSvg";
import { motion } from "framer-motion";
import { useSummarizeContext } from "../context/useSummarizeContext";

const Sidebar = () => {
  const { sidebar, handleSidebar } = useSummarizeContext();
  return (
    <motion.div
      initial={{ width: "250px" }}
      animate={
        sidebar
          ? { width: "0px", paddingLeft: 0, paddingRight: 0 }
          : { width: "250px" }
      }
      className={` border h-full py-[46px] px-[24px] relative overflow-hidden border-[#EFEFEF] gap-[24px] flex flex-col `}
    >
      {/* <motion.div
        whileHover={{ backgroundColor: "#EEEEEE" }}
        whileTap={{ backgroundColor: "#FFFFFF" }}
        className={` w-fit p-[5px] rounded-[8px] cursor-pointer flex gap-[5px]`}
        style={{ backgroundColor: "#FFFFFF" }}
        onClick={() => handleSidebar()}
      >
        <Image src={bg_button} width={24} height={24} alt="sidebar_image.jpg" />
        {sidebar && <div className="min-w-[180px]"></div>}
      </motion.div> */}

      <div className={`flex flex-col gap-[16px] h-full min-w-[180px]`}>
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
      <motion.button
        whileHover={{ backgroundColor: "#EEEEEE" }}
        whileTap={{ scale: 0.9 }}
        style={{ backgroundColor: "#FFFFFF" }}
        className={`py-[12px]  px-[24px] cursor-pointer min-w-[180px] flex items-center justify-center border border-[#F0F0F0] rounded-[8px] gap-[8px]`}
      >
        <PencilSvg />
        <label htmlFor="" className="font-[500] text-[14px] cursor-pointer">
          New Session
        </label>
      </motion.button>
    </motion.div>
  );
};

export default Sidebar;

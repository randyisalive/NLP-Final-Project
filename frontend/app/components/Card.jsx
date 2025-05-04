"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useSummarizeContext } from "../context/useSummarizeContext";
import { Dialog } from "primereact/dialog";
import { truncateString } from "../function/truncate_string";
import SummarizeButton from "./SummarizeButton";
import { ProgressSpinner } from "primereact/progressspinner";

const Card = ({ title = "Untitled Document", id = "", card_data = {} }) => {
  // context
  const { delete_chat_data } = useSummarizeContext();

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  // hover state
  const [hover, setHover] = useState(false);

  // delete dialog
  const [delDialog, setDelDialog] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(0);

  const params = new URLSearchParams(searchParams);
  return (
    <>
      {" "}
      <motion.button
        whileHover={{ backgroundColor: "#EEEEEE" }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{ backgroundColor: "#FFFFFF" }}
        onClick={() => {
          params.set("id", card_data.id);
          router.push(`?${params}`, { scroll: false });
        }}
        className="w-full rounded-[8px] cursor-pointer flex justify-between border p-[8px] gap-[10px] text-start border-[#F0F0F0] font-[400] text-[12px] text-[#3B3A3B]"
      >
        {card_data.text === ""
          ? "Untitled Document"
          : truncateString(card_data.text, 23)}
        <AnimatePresence>
          <motion.div
            animate={hover ? { opacity: 1 } : { opacity: 0 }}
            className="  flex items-center justify-center relative"
            style={hover ? { display: "block" } : { display: "none" }}
            onClick={(e) => {
              e.stopPropagation();
              setDelDialog(true);
              // delete_chat_data(id);
            }}
          >
            <i className="pi pi-trash"></i>
          </motion.div>
        </AnimatePresence>
      </motion.button>
      <AnimatePresence>
        {delDialog && (
          <div className="z-10">
            <div className=" absolute left-0 top-0 backdrop-blur-[5px] w-screen h-screen bg-opacity-50 text-base"></div>
            <div className=" absolute left-0 top-0 flex justify-center    w-screen h-screen">
              <motion.div
                initial={{ y: "-100%" }}
                animate={{ y: 80 }}
                exit={{ y: "-100%" }}
                className=" text-black opacity-100 w-[640px] text-justify h-fit shadow bg-white p-[28px] border border-[#F0F0F0] rounded-[12px] flex flex-col gap-[10px]"
              >
                <p className=" text-[16px]">
                  Delete chat history? This will remove all conversations
                  permanently.
                </p>
                {deleteLoading === 1 ? (
                  <ProgressSpinner />
                ) : (
                  <div className="py-3 flex w-full justify-center items-center gap-[16px]">
                    <SummarizeButton
                      clickType={true}
                      title="Delete"
                      primaryColor="#8d301e"
                      onClickFunction={() => {
                        setDeleteLoading(1);
                        delete_chat_data(card_data.id).then(() => {
                          setDelDialog(false);
                          setDeleteLoading(0);
                        });
                      }}
                    />
                    <SummarizeButton
                      clickType={true}
                      title="Keep My Chats"
                      primaryColor="#539470"
                      onClickFunction={() => setDelDialog(false)}
                    />
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Card;

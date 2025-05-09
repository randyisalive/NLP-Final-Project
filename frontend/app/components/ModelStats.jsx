import React, { useState } from "react";

import { Knob } from "primereact/knob";
import { ProgressSpinner } from "primereact/progressspinner";
import { motion, AnimatePresence } from "framer-motion";
import { useRougeScoresContext } from "../context/useRougeScoresContext";

const ModelStats = () => {
  const { isLoadingRouge, rouge, updatRougeScores, testLen, setTestLen } =
    useRougeScoresContext();
  const [value, setValue] = useState(0);

  if (isLoadingRouge == 0) {
    return (
      <div>
        <ProgressSpinner />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="card flex justify-start h-full mt-5 w-full flex-col items-center gap-2 "
    >
      <div className="w-full flex justify-between p-3">
        <div className="flex flex-col gap-2 w-[100px]">
          <label htmlFor="" className=" text-[12px]">
            Rouge Samples
          </label>
          <input
            type="number"
            value={testLen}
            onChange={(e) => setTestLen(e.target.value)}
            className="border border-[#F0F0F0] w-full px-1 focus:outline-none"
          />
        </div>

        <motion.i
          whileTap={{ scale: 0.9 }}
          className="pi pi-refresh text-[18px] cursor-pointer"
          onClick={() => updatRougeScores()}
        ></motion.i>
      </div>
      <span>Rouge 1</span>

      <Knob
        valueColor="#1a54e9"
        value={Number(rouge?.summarize?.rouge_1 ?? 0).toFixed(2) * 100}
        onChange={(e) => setValue(e.value)}
        valueTemplate="{value}%"
      />
      <span>Rouge 2</span>

      <Knob
        valueColor="#1a54e9"
        value={Number(rouge?.summarize?.rouge_2 ?? 0).toFixed(2) * 100}
        valueTemplate="{value}%"
        onChange={(e) => setValue(e.value)}
      />
      <span>Rouge 3/L</span>

      <Knob
        valueColor="#1a54e9"
        value={Number(rouge?.summarize?.rouge_L ?? 0).toFixed(2) * 100}
        valueTemplate="{value}%"
        onChange={(e) => setValue(e.value)}
      />
    </motion.div>
  );
};

export default ModelStats;

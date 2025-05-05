"use client";
import "primeicons/primeicons.css";
import TextAreaBox from "./components/TextAreaBox";
import ResultBox from "./components/ResultBox";
import Sidebar from "./components/Sidebar";
import { SummarizeContextProvider } from "./context/useSummarizeContext";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { ModelStatsContextProvider } from "./context/useModelStatsContext";
import { RougeScoresContextProvider } from "./context/useRougeScoresContext";

export default function Home() {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const id = params.get("id");
  return (
    <SummarizeContextProvider>
      <ModelStatsContextProvider>
        <RougeScoresContextProvider>
          <div className=" w-screen h-screen flex">
            <Sidebar />
            <AnimatePresence mode="wait">
              <motion.div
                key={id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className=" w-[100%] overflow-y-auto py-[20px] px-[30px]"
              >
                <TextAreaBox />
                <ResultBox />
              </motion.div>
            </AnimatePresence>
          </div>
        </RougeScoresContextProvider>
      </ModelStatsContextProvider>
    </SummarizeContextProvider>
  );
}

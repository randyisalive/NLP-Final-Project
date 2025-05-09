// src/context/MyContext.jsx

import React, { createContext, useContext, useState } from "react";
import useRougeScoresData from "../hooks/useRougeScoresData";

// Create your context with an optional default value (here it's an empty object)
const RougeScoresContext = createContext({});

// Create a provider component
export const RougeScoresContextProvider = ({ children }) => {
  const {
    isLoadingRouge,
    rouge,
    updatRougeScores,
    modelSelected,
    selectModel,
    testLen,
    setTestLen,
  } = useRougeScoresData();

  return (
    <RougeScoresContext.Provider
      value={{
        isLoadingRouge,
        rouge,
        updatRougeScores,
        modelSelected,
        selectModel,
        testLen,
        setTestLen,
      }}
    >
      {children}
    </RougeScoresContext.Provider>
  );
};

// Create a custom hook to use the MyContext
export const useRougeScoresContext = () => {
  const context = useContext(RougeScoresContext);

  // Optionally, add error handling if the hook is used outside of its Provider
  if (context === undefined) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }

  return context;
};

export default RougeScoresContext;

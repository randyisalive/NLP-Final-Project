// src/context/MyContext.jsx

import React, { createContext, useContext, useState } from "react";
import useModelStatsData from "../hooks/useModelStatsData";

// Create your context with an optional default value (here it's an empty object)
const ModelStatsContext = createContext({});

// Create a provider component
export const ModelStatsContextProvider = ({ children }) => {
  const { selectModel, modelSelected, model, closeInformation } =
    useModelStatsData();

  return (
    <ModelStatsContext.Provider
      value={{
        selectModel,
        modelSelected,
        model,
        closeInformation,
      }}
    >
      {children}
    </ModelStatsContext.Provider>
  );
};

// Create a custom hook to use the MyContext
export const useModelStatsContext = () => {
  const context = useContext(ModelStatsContext);

  // Optionally, add error handling if the hook is used outside of its Provider
  if (context === undefined) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }

  return context;
};

export default ModelStatsContext;

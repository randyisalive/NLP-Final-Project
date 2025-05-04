// src/context/MyContext.jsx

import React, { createContext, useContext, useState } from "react";
import useSummarizeData from "../hooks/useSummarizeData";

// Create your context with an optional default value (here it's an empty object)
const SummarizeContext = createContext({});

// Create a provider component
export const SummarizeContextProvider = ({ children }) => {
  const {
    summary,
    handleForm,
    submitForm,
    form,
    isLoading,
    rouge,
    model,
    modelSelected,
    closeInformation,
    selectModel,
    sidebar,
    handleSidebar,
    chats,
    delete_chat_data,
  } = useSummarizeData();

  return (
    <SummarizeContext.Provider
      value={{
        summary,
        handleForm,
        submitForm,
        form,
        isLoading,
        rouge,
        model,
        modelSelected,
        closeInformation,
        selectModel,
        sidebar,
        handleSidebar,
        chats,
        delete_chat_data,
      }}
    >
      {children}
    </SummarizeContext.Provider>
  );
};

// Create a custom hook to use the MyContext
export const useSummarizeContext = () => {
  const context = useContext(SummarizeContext);

  // Optionally, add error handling if the hook is used outside of its Provider
  if (context === undefined) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }

  return context;
};

export default SummarizeContext;

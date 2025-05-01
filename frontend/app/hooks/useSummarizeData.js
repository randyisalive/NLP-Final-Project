"use client";
import React, { useEffect, useState } from "react";

const useSummarizeData = () => {
  // api

  const [summary, setSummary] = useState([]);
  const [rouge, setRouge] = useState([]);
  const [form, setForm] = useState({
    input: "",
  });
  const [isLoading, setIsLoading] = useState(0);

  // model selection
  const [model, setModel] = useState([
    { id: 0, title: "mT5 Model", sub: "Standard AI detection" },
    { id: 1, title: "BERT Model", sub: "Deeper pattern analysis" },
  ]);
  const [modelSelected, setModelSelected] = useState(0);

  // get rouge scores for the model
  useEffect(() => {
    const fetchRouge = async () => {
      try {
        const response = await fetch("/api/rough_scores");
        const data = await response.json();
        setRouge(data.data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchRouge();
  }, []);

  // handle form
  const handleForm = (e) => {
    setForm((prev) => ({ ...prev, input: e.target.value }));
  };

  const submitForm = async (e) => {
    setIsLoading(1);
    setSummary([]);
    e.preventDefault();
    const response = await fetch("/api/summarize", {
      method: "POST",
      body: JSON.stringify({ input_text: form.input }),
    });
    const data = await response.json();
    if (data) {
      console.log("SUCCESS");

      setSummary(data);
      setIsLoading(0);
    }
  };
  return {
    summary,
    handleForm,
    submitForm,
    form,
    isLoading,
    rouge,
    model,
    modelSelected,
  };
};

export default useSummarizeData;

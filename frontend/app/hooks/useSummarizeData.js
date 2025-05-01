"use client";
import React, { useEffect, useState } from "react";

const useSummarizeData = () => {
  // api

  const [summary, setSummary] = useState([]);
  const [rouge, setRouge] = useState([]);
  const [form, setForm] = useState({
    input: "",
  });

  // sidebar settings
  const [sidebar, setSidebar] = useState(false);
  const handleSidebar = () => {
    setSidebar(!sidebar);
  };

  const [isLoading, setIsLoading] = useState(0);

  // model selection
  const [model, setModel] = useState([
    {
      id: 0,
      title: "mT5 Model",
      sub: "Standard AI detection",
      info_status: false,
      information: `
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi id
            repellat ea adipisci voluptate facere porro delectus nostrum
            blanditiis excepturi, voluptatem dolores nulla cupiditate cum illum?
            Quam, fuga. Est, consectetur.
      
      `,
    },
    {
      id: 1,
      title: "BERT Model",
      sub: "Deeper pattern analysis",
      info_status: false,
      information: `
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi id
            repellat ea adipisci voluptate facere porro delectus nostrum
            blanditiis excepturi, voluptatem dolores nulla cupiditate cum illum?
            Quam, fuga. Est, consectetur.
      
      `,
    },
  ]);
  const [modelSelected, setModelSelected] = useState(0);

  const selectModel = async (value) => {
    setModelSelected(value);
  };

  const closeInformation = (id) => {
    setModel((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            info_status: !item.info_status,
          };
        }
        return item;
      })
    );
  };

  useEffect(() => {
    console.log(model);
  }, [model]);

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
    closeInformation,
    selectModel,
    sidebar,
    handleSidebar,
  };
};

export default useSummarizeData;

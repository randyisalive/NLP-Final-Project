"use client";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const useSummarizeData = () => {
  // api

  const [summary, setSummary] = useState({ text: "", summary: "", date: "" });
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

  /*  // get rouge scores for the model
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
  }, []); */

  // handle form
  const handleForm = (e) => {
    setForm((prev) => ({ ...prev, input: e.target.value }));
  };

  const submitForm = async () => {
    setIsLoading(1);
    setSummary({ text: "", summary: "", date: "" });
    if (form.input == "") {
      return;
    }

    const response = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ text: form.input }),
    });
    const data = await response.json();
    if (data) {
      console.log("SUCCESS");

      setSummary({
        text: data.data?.text,
        summary: data.data?.summary,
        date: data.data?.date,
      });
      fetchChats();
      setIsLoading(2);
    }
  };

  // chat data
  const [chats, setChats] = useState([]);
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const id = params.get("id");
  const fetchChats = async () => {
    try {
      const response = await fetch("/api/chat");
      const data = await response.json();
      console.log(data);
      setChats(data);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    fetchChats();
  }, []);

  useEffect(() => {
    const fetchChatId = async () => {
      const response = await fetch(`/api/chat/by_id`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });
      const data = await response.json();
      console.log(data);
      setForm({ input: data.data?.text });
      setSummary({ text: data.data?.text, summary: data.data?.summary });
      setIsLoading(2);
    };
    if (id != undefined) {
      fetchChatId();
    } else {
      setForm({ input: "" });
      setSummary({ title: "", summary: "" });
      setIsLoading(0);
    }
    console.log(id);
  }, [id]);

  // delete chat data
  const delete_chat_data = async (id) => {
    try {
      const response = await fetch("/api/chat/delete", {
        method: "POST",
        body: JSON.stringify({ id: id }),
      });
      const data = await response.json();
      console.log(data);
      if (data) {
        fetchChats();
      }
    } catch (e) {
      console.error(e);
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
    chats,
    delete_chat_data,
  };
};

export default useSummarizeData;

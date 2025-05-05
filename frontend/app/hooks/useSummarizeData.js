"use client";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const useSummarizeData = () => {
  // api

  const [summary, setSummary] = useState({ text: "", summary: "", date: "" });

  const [form, setForm] = useState({
    input: "",
  });

  // sidebar settings
  const [sidebar, setSidebar] = useState(false);
  const handleSidebar = () => {
    setSidebar(!sidebar);
  };

  const [isLoading, setIsLoading] = useState(0);

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

  // handle form
  const handleForm = (e) => {
    setForm((prev) => ({ ...prev, input: e.target.value }));
  };

  // chat data
  const [chats, setChats] = useState([]);
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const id = params.get("id");

  // chats data fetch
  const fetchChats = async () => {
    try {
      const response = await fetch("/api/chat");
      const data = await response.json();
      setChats(data);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    fetchChats();
  }, []);

  const submitForm = async (model_id) => {
    setIsLoading(1);
    setSummary({ text: "", summary: "", date: "" });
    if (form.input == "") {
      return;
    }
    const response = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({
        text: form.input,
        chat_id: id,
        model_id: model_id,
      }),
    });
    const data = await response.json();
    if (data) {
      setSummary({
        text: data.data?.text,
        summary: data.data?.summary,
        date: data.data?.date,
      });
      fetchChats();
      setIsLoading(2);
    }
  };

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

    closeInformation,

    sidebar,
    handleSidebar,
    chats,
    delete_chat_data,
  };
};

export default useSummarizeData;

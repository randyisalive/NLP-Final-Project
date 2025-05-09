import React, { useEffect, useState } from "react";

const useRougeScoresData = () => {
  const [rouge, setRouge] = useState({
    rouge_1: 0,
    rouge_2: 0,
    rouge_3: 0,
  });

  // get rouge scores for the model
  const [isLoadingRouge, setLoadingRouge] = useState(0);
  const [load, setLoad] = useState(false);
  const [modelSelected, setModelSelected] = useState(0);
  const [testLen, setTestLen] = useState(10);

  const selectModel = async (value) => {
    setModelSelected(value);
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    setLoadingRouge(0);

    const fetchRouge = async () => {
      setRouge({ rouge_1: 0, rouge_2: 0, rouge_3: 0 });
      try {
        const response = await fetch("/api/rough_scores", {
          method: "POST",
          signal,
          body: JSON.stringify({ model_id: modelSelected }),
        });
        const data = await response.json();
        console.log(data);
        setRouge(data.data);
        setLoadingRouge(1);
      } catch (e) {
        if (e.name === "AbortError") {
          console.log("Fetch aborted due to state change.");
        } else {
          console.error(e);
        }
      }
    };

    fetchRouge();

    return () => controller.abort(); // Cleanup function to cancel fetch on state change
  }, [load, modelSelected]); // Dependency array ensures it re-runs when `modelSelected` changes

  // change load
  const changeRougeLoad = () => {
    setLoad(!load);
  };

  const updatRougeScores = async () => {
    setLoadingRouge(0);
    try {
      const response = await fetch("/api/rough_scores/add", {
        method: "POST",
        body: JSON.stringify({ model_id: modelSelected, test_len: testLen }),
      });
      const data = await response.json();
      setLoadingRouge(1);
      changeRougeLoad();
      return data;
    } catch (e) {
      console.error(e);
    }
  };

  return {
    isLoadingRouge,
    rouge,
    modelSelected,
    selectModel,
    updatRougeScores,
    changeRougeLoad,
    testLen,
    setTestLen,
  };
};

export default useRougeScoresData;

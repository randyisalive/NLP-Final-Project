import React, { useEffect, useState } from "react";

const useModelStatsData = () => {
  // model selection
  const [model, setModel] = useState([]);
  useEffect(() => {
    const fetchModel = async () => {
      try {
        const response = await fetch("/api/model_data");
        const data = await response.json();
        setModel(data.data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchModel();
  }, []);
  // state

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
  return {
    model,
    closeInformation,
  };
};

export default useModelStatsData;

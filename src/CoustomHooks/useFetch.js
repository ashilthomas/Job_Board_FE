import { useState, useEffect } from "react";
import instance from "@/Utils/Axios"; // Import Axios instance

const useFetch = (url, method = "GET", body = null) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await instance({
        url, 
        method, 
        data: body, // Only for POST, PUT, DELETE
      });
      setData(response.data);
    } catch (err) {
      setError(err.response?.data || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
     fetchData(); // Auto-fetch only for GET
  }, [url]);

  return { data, loading, error, fetchData }; // fetchData can be used for POST, PUT, DELETE
};

export default useFetch;

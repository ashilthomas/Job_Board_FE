// src/CoustomHooks/useFetch.js
import { useState, useEffect, useCallback } from "react";
import instance from "@/Utils/Axios"; // Custom Axios instance

const useFetch = (url, method = "GET", body = null) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(
    async (overrideBody = body) => {
      setLoading(true);
      setError(null);

      // Setup cancellation in case of rapid re-fetch
      const controller = new AbortController();

      try {
        const response = await instance.request({
          url,
          method,
          data: overrideBody,
          signal: controller.signal,
        });
        setData(response.data ?? null);
      } catch (err) {
        if (err.name !== "CanceledError") {
          setError(err.response?.data?.message || err.message || "Something went wrong!");
        }
      } finally {
        setLoading(false);
      }

      return () => controller.abort();
    },
    [url, method, body]
  );

  // Auto-fetch only for GET requests
  useEffect(() => {
    if (method.toUpperCase() === "GET") {
      const abortFn = fetchData();
      return abortFn;
    }
  }, [url, method, fetchData]);

  return { data, loading, error, fetchData };
};

export default useFetch;

import { useState, useEffect, useCallback } from "react";
import instance from "@/Utils/Axios"; // Custom Axios instance

const useFetch = (url, method = "GET", body = null, autoFetch = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(autoFetch);
  const [error, setError] = useState(null);

  const fetchData = useCallback(
    async (overrideBody = body, signal) => {
      setLoading(true);
      setError(null);

      try {
        const response = await instance.request({
          url,
          method,
          data: overrideBody,
          signal,
        });
        setData(response.data ?? null);
      } catch (err) {
        if (err.name !== "CanceledError") {
          setError(
            err.response?.data?.message || err.message || "Something went wrong!"
          );
        }
      } finally {
        setLoading(false);
      }
    },
    [url, method, body]
  );

  useEffect(() => {
    if (autoFetch) {
      const controller = new AbortController();
      fetchData(body, controller.signal);

      // ✅ Return a real cleanup function, not a Promise
      return () => controller.abort();
    }
  }, [url, method, body, autoFetch, fetchData]);

  return { data, loading, error, fetchData };
};

export default useFetch;

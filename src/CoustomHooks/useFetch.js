import { useState, useEffect, useCallback, useRef } from "react";
import instance from "@/Utils/Axios"; // Custom Axios instance

/**
 * Custom hook to fetch data
 * @param {string} url - API endpoint (relative to Axios baseURL)
 * @param {string} method - HTTP method (GET, POST, PUT, DELETE)
 * @param {object|null} body - Request body for POST/PUT
 * @param {boolean} autoFetch - Should auto fetch on mount (default true)
 */
const useFetch = (url, method = "GET", body = null, autoFetch = true) => {
  console.log(url,method);
  
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(autoFetch);
  const [error, setError] = useState(null);
  const controllerRef = useRef(null);

  const fetchData = useCallback(
    async (overrideBody = body) => {
      // Cancel previous request if any
      if (controllerRef.current) {
        controllerRef.current.abort();
      }

      const controller = new AbortController();
      controllerRef.current = controller;

      setLoading(true);
      setError(null);

      try {
        const response = await instance.request({
          url,
          method,
          data: overrideBody,
          signal: controller.signal,
        });
        setData(response.data ?? null);
      } catch (err) {
        // Ignore cancellation
        if (err.name !== "CanceledError" && err.name !== "AbortError") {
          setError(err.response?.data?.message || err.message || "Something went wrong!");
        }
      } finally {
        setLoading(false);
      }
    },
    [url, method, body]
  );

  // Auto-fetch for GET requests by default
  useEffect(() => {
    if (!autoFetch) return;

    fetchData();

    // Cleanup abort on unmount or deps change
    return () => {
      if (controllerRef.current) {
        try { controllerRef.current.abort(); } catch {}
      }
    };
  }, [url, method, fetchData, autoFetch]);

  return { data, loading, error, fetchData };
};

export default useFetch;



// src/Utils/Axios.js
import axios from "axios";
import store from "@/Redux/store";

// Detect environment → automatically choose API URL
const BASE_URL =
  "https://job-board-be-21s5.onrender.com/api/v1/" || "http://localhost:4000/api/v1/";

// Create Axios instance
const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // send cookies
});

// Attach token to requests
instance.interceptors.request.use(
  (config) => {
    const token = store.getState()?.user?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle global errors (optional improvement)
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || "Unexpected server error";
    console.error("API Error:", message);
    return Promise.reject(error);
  }
);

export default instance;

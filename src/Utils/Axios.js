// src/Utils/Axios.js
import axios from "axios";
import store from "@/Redux/store";

// Choose API base automatically (switch localhost / production)
const BASE_URL = "http://localhost:4000/api/v1/";

// Create Axios instance
const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // send cookies
});

// Attach token to requests
instance.interceptors.request.use(
  (config) => {
    // FIXED: use the correct slice name
    const token = store.getState()?.userData?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle global errors
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

//  "https://job-board-be-21s5.onrender.com/api/v1/"
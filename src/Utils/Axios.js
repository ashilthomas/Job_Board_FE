// src/Utils/Axios.js
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { setLogOut } from "@/Redux/userData";
import store from "@/Redux/store";

// API base URL
const BASE_URL = "http://localhost:4000/api/v1/";

const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Helper: check if token expired
const isTokenExpired = (token) => {
  try {
    const { exp } = jwtDecode(token);
    if (!exp) return true;
    return Date.now() >= exp * 1000; // exp is in seconds
  } catch {
    return true;
  }
};

// Attach token to requests
instance.interceptors.request.use(
  (config) => {
    const token = store.getState()?.userData?.token;

    if (token) {
      // ✅ proactive check
      if (isTokenExpired(token)) {
        console.warn("Token expired before request → logging out");
        store.dispatch(setLogOut());
        return Promise.reject({ message: "Token expired" });
      }

      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle responses
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;

    if (status === 401) {
      console.warn("401 Unauthorized → token expired or invalid");
      store.dispatch(setLogOut());
    }

    return Promise.reject(error);
  }
);

export default instance;


//  "https://job-board-be-21s5.onrender.com/api/v1/"
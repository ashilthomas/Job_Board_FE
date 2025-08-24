import axios from "axios";
import { jwtDecode } from "jwt-decode";

import store from "@/Redux/store";
import { setLogOut } from "@/Redux/userData";

//"http://localhost:4000/api/v1/"; ""https://job-board-be-21s5.onrender.com/api/v1"  
const BASE_URL = "https://job-board-be-21s5.onrender.com/api/v1" ;

const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// helper: token expired?
const isTokenExpired = (token) => {
  try {
    const { exp } = jwtDecode(token);
    if (!exp) return true;
    return Date.now() >= exp * 1000;
  } catch {
    return true;
  }
};

// request interceptor
instance.interceptors.request.use(
  (config) => {
    const token = store.getState()?.user?.token; // ✅ FIXED PATH

    if (token) {
      if (isTokenExpired(token)) {
        console.warn("Token expired → logging out");
        store.dispatch(setLogOut());
        return Promise.reject({ message: "Token expired" });
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// response interceptor
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("401 Unauthorized → logging out");
      store.dispatch(setLogOut());
    }
    return Promise.reject(error);
  }
);

export default instance;

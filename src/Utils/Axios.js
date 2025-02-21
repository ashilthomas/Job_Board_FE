import store from "@/Redux/store";
import axios from "axios";
 // Import the Redux store

// Create Axios instance
const instance = axios.create({
    baseURL: "http://localhost:4000/api/v1/",
    withCredentials: true, // ✅ Ensures cookies are sent with requests
});

// ✅ Automatically attach token to every request
instance.interceptors.request.use(
    (config) => {
        const state = store.getState(); // ✅ Get Redux state directly
        const token = state?.user?.token; // ✅ Retrieve token safely
        
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; 
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default instance;



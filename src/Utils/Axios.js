import store from "@/Redux/store"; // Ensure this import path is correct
import axios from "axios";

// Create Axios instance
const instance = axios.create({
    // baseURL: "https://job-board-be-21s5.onrender.com/api/v1/", // Ensure API is up
    baseURL: "http://localhost:4000/api/v1/", // Ensure API is up
    withCredentials: true, // Ensures cookies are sent
});

// Attach token automatically to every request
instance.interceptors.request.use(
    (config) => {
        try {
            const state = store.getState(); // Get Redux state
            const token = state?.user?.token; // Retrieve token safely

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (error) {
            console.error("Error retrieving token from Redux:", error);
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default instance;

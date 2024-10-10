// src/utils/newRequest.js
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"; // Fallback for development

const newRequest = axios.create({
  baseURL: `${API_BASE_URL}/api/`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // If you want to include credentials like cookies, even though you're using tokens
});

// Intercept request to always include the latest token from localStorage
newRequest.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle Unauthorized errors (e.g., token expired)
      localStorage.removeItem("accessToken");
      localStorage.removeItem("currentUser");
      window.location.href = "/login"; // Redirect to login if unauthorized
    }
    return Promise.reject(error);
  }
);

export default newRequest;

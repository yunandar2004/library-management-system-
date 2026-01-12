// src/api/axios.js
import { apiURL } from "@/services/auth";
import { token } from "@/services/profile";
import axios from "axios";

const api = axios.create({
//   baseURL: "http://localhost:5000/api", // adjust to your backend URL
baseURL:`${apiURL}`
});

// Attach token automatically if stored in localStorage
api.interceptors.request.use((config) => {
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

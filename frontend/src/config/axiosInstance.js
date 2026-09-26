// src/config/axiosInstance.js
// SHARED — owned by Person 1. Copied here verbatim per StockSense_Frontend_Structure.md
// so feature api/ files have something to import against while auth is built.
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosInstance;
import axios from "axios";
import { API_URL } from "../constants";

export const API = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  }
})

// Interceptor to add JWT token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (!config.headers) 
    config.headers = {}
  
  if (token) 
    config.headers.Authorization = `Bearer ${token}`
  
  return config;
})

export default API
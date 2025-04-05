import axios from "axios";
import { config } from "../config";

export const API = axios.create({
  baseURL: config.API_URL,
  headers: {
    "Content-Type": "application/json",
  }
})

// Interceptor to add JWT token to every request
API.interceptors.request.use((_config) => {
  const token = localStorage.getItem("token");

  if (!_config.headers) 
    _config.headers = {}
  
  if (token) 
    _config.headers.Authorization = `Bearer ${token}`
  
  return _config;
})

export default API
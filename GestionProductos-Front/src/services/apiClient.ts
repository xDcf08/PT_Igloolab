import axios, { AxiosError } from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "ttp://localhost:6505";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

apiClient.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error: AxiosError) => {
    console.log(error)
    return Promise.reject(error.response?.data)
  }
);
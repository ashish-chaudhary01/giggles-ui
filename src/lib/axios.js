import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://giggles-api.onrender.com/api/v1",
  withCredentials: true,
});

import axios from "axios";

const API_BASE_URL = "http://188.121.111.8:3001/";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

apiClient.interceptors.request.use((opt) => {
  const token = JSON.parse(localStorage.getItem("token"));
  if (token) {
    opt.headers.Authorization = `Bearer ${token}`;
  }
  return opt;
});

export default apiClient;

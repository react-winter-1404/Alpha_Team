import axios from "axios";

const API_BASE_URL = "https://fe-api.hexorix.net/";

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

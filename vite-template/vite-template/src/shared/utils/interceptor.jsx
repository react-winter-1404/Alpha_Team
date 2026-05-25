import axios from 'axios';


const axiosInstance = axios.create({
  baseURL: 'http://react.genzuni.website' 
 
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
 
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;
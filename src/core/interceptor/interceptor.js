import axios from 'axios';
const API_BASE_URL ='http://react.genzuni.website';

const apiClient = axios.create({
    baseURL:API_BASE_URL,
});

apiClient.interceptors.request.use((opt)=>{
    const token = JSON.parse(sessionStorage.getItem('token'));
    if (token){
        opt.headers.Authorization = `Bearer ${token}`;
    }
    return opt;
})

export default apiClient;

import axios from 'axios';
<<<<<<< HEAD:AlphaTeam/src/core/interceptor/interceptor.js
const API_BASE_URL ='http://188.121.111.8:3001/';
=======
const API_BASE_URL ='http://188.121.111.8:3001';
>>>>>>> 44456263970bfd64da81a6abb8d0540ac03da0de:src/core/interceptor/interceptor.js

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

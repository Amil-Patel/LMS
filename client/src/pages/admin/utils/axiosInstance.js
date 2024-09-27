import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_URL,
  withCredentials: true, 
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = document.cookie.split('; ').find(row => row.startsWith('token='));
    if (token) {
      const tokenValue = token.split('=')[1];
      config.headers['Authorization'] = `Bearer ${tokenValue}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
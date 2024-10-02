// axiosInstance.js
import axios from 'axios';
import { Api_keys } from './Key';

const API_KEY = Api_keys;
// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_URL,  // Set your base URL
  headers: {
    'lms-api-key': API_KEY,  // Include the API key in headers
  },
});


export default axiosInstance;

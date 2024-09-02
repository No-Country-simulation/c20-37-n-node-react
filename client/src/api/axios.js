import axios from "axios";
import { VITE_API_HOST } from "../config/config";
import Cookies from 'js-cookie';

axios.interceptors.request.use(
    (config) => {
        const token = Cookies.get('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const instance = axios.create({
    baseURL: VITE_API_HOST,
    withCredentials: true,
    credentials: 'include'
})

export default instance;
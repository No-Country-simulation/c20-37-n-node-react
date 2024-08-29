import axios from "axios";
import { VITE_API_HOST } from "../config/config";


const instance = axios.create({
    baseURL: VITE_API_HOST,
    withCredentials: true,
    credentials: 'include'
})

export default instance;
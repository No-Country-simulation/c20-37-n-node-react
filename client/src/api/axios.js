import axios from "axios";
import { VITE_API_HOST } from "../config/config";

const baseURL = VITE_API_HOST;
const instance = axios.create({
  baseURL,
  withCredentials: true,
  credentials: "include",
});

export default instance;

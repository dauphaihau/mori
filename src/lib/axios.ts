import axios from 'axios';
import { config } from "../config";
// import getConfig from 'next/config';
// const { publicRuntimeConfig } = getConfig();

const api = axios.create({
  // baseURL: publicRuntimeConfig.backendUrl,
  // baseURL: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
  baseURL: process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_BASE_URL
    : "http://localhost:3000",
  timeout: config.request.timeoutRequest
});

export default api

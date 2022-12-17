import axios from 'axios';
import { config } from "../config";
import { BASE_URL } from "config/const";
import { handleGetCookie } from "./cookie";

const authData = handleGetCookie(config.cookies.auth)

const api = axios.create({
  baseURL: BASE_URL,
  timeout: config.request.timeoutRequest
});

api.defaults.headers.common['authorization'] = `Bearer ${authData?.token}`;
api.defaults.headers.post['Content-Type'] = 'application/json';

export default api

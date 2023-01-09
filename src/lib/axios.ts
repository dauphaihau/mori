import axios from 'axios';

import { config } from "config";
import { BASE_URL } from "config/const";
import { handleGetCookie } from "lib/cookie";
import { IToken } from "types/token";

const authData = handleGetCookie<IToken>(config.cookies.auth)

const api = axios.create({
  baseURL: BASE_URL,
  timeout: config.request.timeoutRequest
});

api.defaults.headers.common['Authorization'] = `Bearer ${authData?.token}`;
api.defaults.headers.post['Content-Type'] = 'application/json';

export default api

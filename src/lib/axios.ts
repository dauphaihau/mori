import axios from 'axios';

import { config } from "config";
import { BASE_URL } from "config/const";
import { getCookie } from "lib/cookie";
import { IToken } from "types/token";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: config.request.timeoutRequest
});

api.defaults.headers.post['Content-Type'] = 'application/json';

api.interceptors.request.use(configReq => {
    const authData = getCookie<IToken>(config.cookies.auth)
    if (authData) {
      configReq.headers['Authorization'] = `Bearer ${JSON.stringify(authData)}`;
    }
    return configReq;
  },
  error => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use((response) => {
  return response;
}, error => {
  return Promise.reject(error);
});

export default api

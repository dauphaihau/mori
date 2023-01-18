import axios from 'axios';

import { config } from "config";
import { BASE_URL } from "config/const";
import { handleGetCookie, handleRemoveCookie, handleSetCookie } from "lib/cookie";
import { IToken } from "types/token";
import { signToken, verifyToken } from "lib/jwt";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: config.request.timeoutRequest
});

api.defaults.headers.post['Content-Type'] = 'application/json';
// api.defaults.headers.common['Authorization'] = authData?.token ? `Bearer ${authData?.token}` : '';

api.interceptors.request.use(configReq => {
    const authData = handleGetCookie<IToken>(config.cookies.auth)
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

  // if (error.response.status == 401) {
  //   handleRemoveCookie(config.cookies.auth)
  //   handleRemoveCookie(config.cookies.profile)
  // }

  // if (error.response.status == 401 && error.response.data.code === '4001') {
  const authData = handleGetCookie<IToken>(config.cookies.auth)
  if (error.response.data.code === '4001') {
    const refreshToken = async () => {
      const secret = process.env.NEXT_PUBLIC_JWT_SECRET
      const dataToken = await verifyToken(authData.token, secret)
      authData.token = await signToken(dataToken, secret, config.token.tokenLife)
      handleSetCookie(config.cookies.auth, authData)
    }
    refreshToken()
  }

  return Promise.reject(error);
});

export default api

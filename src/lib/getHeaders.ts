import config from 'config/config.json';
import { handleGetCookie } from "./cookie";

export const getHeaders = () => {
  const data = handleGetCookie(config.cookies.auth)
  return {
    headers: {
      authorization: `Bearer ${data.token}`,
    }
  }
}

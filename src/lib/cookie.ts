import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { hashMD5 } from './crypto';
import { parseJson } from 'core/helpers';

export const handleSetCookie = (key, data) => {
  data = JSON.stringify(data)
  setCookie(null, hashMD5(key), data, {
    maxAge: 30 * 24 * 60 * 60,
    // expires: new Date(expiredAt),
    path: '/'
  });
}

export const handleGetCookie = (key) => {
  const cookies = parseCookies();
  const data = parseJson(cookies[hashMD5(key)])
  if (data) return data
  return null
}

export const handleRemoveCookie = (key) => {
  destroyCookie(null, hashMD5(key), {
    path: '/',
    expires: new Date(0),
  });
}

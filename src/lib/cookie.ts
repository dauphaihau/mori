import { destroyCookie, parseCookies, setCookie as setCookieByNookies} from 'nookies';
import { hashMD5 } from 'lib/crypto';
import { parseJSON } from 'core/helpers';
import { config } from "config";
import { IToken } from "types/token";

export const setCookie = (key, data, expiredAt?: object) => {
  data = JSON.stringify(data)
  setCookieByNookies(null, hashMD5(key), data, {
    expires: expiredAt,
    path: '/'
  });
}

export const getCookie = <T>(key: string | null): T | undefined => {
  const cookies = parseCookies();
  const data = parseJSON<T>(cookies[hashMD5(key)])
  if (data) return data
  return undefined
}

export const removeCookie = (key: string | null): void => {
  destroyCookie(null, hashMD5(key), {
    path: '/',
    expires: new Date(0),
  });
}

export const getHeadersWithAuth = () => {
  try {
    const authData = getCookie<IToken>(config.cookies.auth)
    return {
      Authorization: `Bearer ${JSON.stringify(authData)}`
    }
  } catch (e) {
    throw e;
  }
}

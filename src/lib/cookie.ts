import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { hashMD5 } from 'lib/crypto';
import { parseJSON } from 'core/helpers';
import { IUser } from 'types/user';
import { config } from "config";
import { IToken } from "types/token";

export const handleSetCookie = (key, data) => {
  data = JSON.stringify(data)
  setCookie(null, hashMD5(key), data, {
    maxAge: 30 * 24 * 60 * 60,
    // expires: new Date(expiredAt),
    path: '/'
  });
}

export const handleGetCookie = <T>(key: string | null): T | undefined => {
  const cookies = parseCookies();
  const data = parseJSON<T>(cookies[hashMD5(key)])
  if (data) return data
  return undefined
}

export const handleRemoveCookie = (key: string | null): void => {
  destroyCookie(null, hashMD5(key), {
    path: '/',
    expires: new Date(0),
  });
}

export const getPackageProfile = (): Partial<IUser> => {
  try {
    const profile = handleGetCookie(config.cookies.profile);
    // console.log('dauphaihau debug: profile', profile)
    return profile;
  } catch (e) {
    throw e;
  }
}

export const getHeadersWithAuth = () => {
  try {
    const authData = handleGetCookie<IToken>(config.cookies.auth)
    return {
      Authorization: `Bearer ${JSON.stringify(authData)}`
    }
  } catch (e) {
    throw e;
  }
}

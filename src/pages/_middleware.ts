import { NextRequest, NextResponse } from 'next/server';

import { PATH, ROLE, USER_STATUS } from 'config/const';
import { hashMD5 } from 'lib/crypto';
import { isFalsy, isEmptyObject, parseJSON } from 'core/helpers';
import { verifyToken } from 'lib/jwt';
import { IToken } from "types/user";
import { config } from "config";

export async function middleware(req: NextRequest) {

  const url = req.nextUrl.clone();
  url.pathname = PATH.HOME;

  const urlCurrent = req.nextUrl.pathname
  const routesPrivate = [PATH.ACCOUNT._, PATH.ACCOUNT.ADDRESS]
  const routesAuth = [PATH.ACCOUNT.LOGIN, PATH.ACCOUNT.REGISTER, PATH.ACCOUNT.FORGOT_PASSWORD, PATH.ACCOUNT.RESET_PASSWORD]

  const cookies = req.cookies;
  const authData = parseJSON<IToken>(cookies[hashMD5(config.cookies.auth)])

  let dataToken;
  if (authData && authData.token && authData.refreshToken) {
    dataToken = await handleToken(authData)
  }

  if (routesAuth.includes(urlCurrent)) {

    if (urlCurrent === PATH.ACCOUNT.RESET_PASSWORD) {
      const urlSearchParams = new URLSearchParams(req.nextUrl.search);
      const params = Object.fromEntries(urlSearchParams.entries())
      if (isEmptyObject(params)) return NextResponse.redirect(url)
    }

    if (!isFalsy(dataToken)) return NextResponse.redirect(url)
  }

  if (routesPrivate.includes(urlCurrent)) {
    if (isFalsy(dataToken)) return NextResponse.redirect(url)

    if (dataToken.role !== ROLE.ACCOUNT || dataToken.status === USER_STATUS.LOCKED) {
      return NextResponse.redirect(url)
    }
  }
}

async function handleToken(authData): Promise<object> {

  // const secret = process.env.STRIPE_SECRET_KEY // mock
  const secret = process.env.NEXT_PUBLIC_JWT_SECRET
  const dataToken = await verifyToken(authData.token, secret)
  const dataRefreshToken = await verifyToken(authData.refreshToken, secret)
  const now = Math.floor(Date.now() / 1000);

  // 1. require token verified success
  if (!dataToken || !dataRefreshToken) {
    return null
  }

  // 2. refreshToken & token expired --> re-login
  // if (dataToken.exp > now && refreshToken.exp > now) { // mock
  if (dataToken.exp < now && dataRefreshToken.exp < now) {
    console.log('dauphaihau debug: run case token + refreshToken expired ')
    return null
  }

  return dataToken
}

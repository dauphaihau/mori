import { NextRequest, NextResponse } from 'next/server';
import { PATH, ROLE, USER_STATUS } from 'config/const';
import { hashMD5 } from 'lib/crypto';
import configJson from 'config/config.json';
import { isEmpty, parseJSON } from 'core/helpers';
import { signToken, verifyToken } from 'lib/jwt';
import { IToken } from "types/user";
import { config } from "config";
import { handleRemoveCookie, handleSetCookie } from "lib/cookie";

export async function middleware(req: NextRequest) {

  const url = req.nextUrl.clone();
  url.pathname = PATH.HOME;

  const urlCurrent = req.nextUrl.pathname
  const routesPrivate = [PATH.ACCOUNT._, PATH.ACCOUNT.ADDRESS]
  const routesAuth = [PATH.ACCOUNT.LOGIN, PATH.ACCOUNT.REGISTER, PATH.ACCOUNT.FORGOT_PASSWORD, PATH.ACCOUNT.RESET_PASSWORD]

  const cookies = req.cookies;
  const auth = parseJSON<IToken>(cookies[hashMD5(configJson.cookies.auth)])

  let dataToken;
  if (auth && auth.token && auth.refreshToken) {
    dataToken = await handleToken(auth)
  }

  if (routesAuth.includes(urlCurrent)) {
    console.log('dauphaihau debug: data-token', dataToken)
    if (!isEmpty(dataToken)) return NextResponse.redirect(url)
  }

  if (routesPrivate.includes(urlCurrent)) {
    if (isEmpty(dataToken)) return NextResponse.redirect(url)

    if (dataToken.role !== ROLE.ACCOUNT || dataToken.status === USER_STATUS.LOCKED) {
      return NextResponse.redirect(url)
    }
  }
}

async function handleToken(authData): Promise<object> {

  // const secret = process.env.STRIPE_SECRET_KEY // mock
  const secret = process.env.NEXT_PUBLIC_JWT_SECRET
  const dataToken = await verifyToken(authData.token, secret)
  const refreshToken = await verifyToken(authData.refreshToken, secret)
  const now = Math.floor(Date.now() / 1000);

  // require token verified success
  if (dataToken && refreshToken) {

    // 1. refreshToken & token works
    if (dataToken.exp > now && refreshToken.exp > now) {
      console.log('dauphaihau debug: run case refreshToken & token works')
      return dataToken
    }

    // 2. refreshToken & token expired --> re-login
    // if (dataToken.exp > now && refreshToken.exp > now) { // mock
    if (dataToken.exp < now && refreshToken.exp < now) {
      // handleRemoveCookie(config.cookies.auth)
      // handleRemoveCookie(config.cookies.profile)
      console.log('dauphaihau debug: run case token + refreshToken expired ')
      return null
    }

    // 3. refreshToken works - token expired
    if (dataToken.exp > now && refreshToken.exp > now) { // mock
    // if (dataToken.exp < now && refreshToken.exp > now) {
      console.log('dauphaihau debug: run case token expired')

      const newToken = await signToken(dataToken, secret, config.token.tokenLife);
      const newDataToken = await verifyToken(newToken, secret)

      // console.log('dauphaihau debug: data-token-token', dataToken)
      // console.log('dauphaihau debug: new-data-token', newDataToken)

      // console.log('dauphaihau debug: token-auth-token', newToken === authData.token)
      authData.token = newToken
      // console.log('dauphaihau debug: token-auth-token', newToken === authData.token)

      // doesn't work
      handleSetCookie(config.cookies.auth, authData)

      return newDataToken
    }
  }
  return null
}

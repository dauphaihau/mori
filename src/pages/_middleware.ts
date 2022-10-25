import { NextRequest, NextResponse } from 'next/server';
import { ROLE, USER_STATUS } from 'config/enums';
import Enums from 'config/enums';
import { hashMD5 } from 'lib/crypto';
import configJson from 'config/config.json';
import { isEmpty, parseJson } from 'core/helpers';
import { verifyToken } from 'lib/jwt';

export async function middleware(req: NextRequest) {

  const url = req.nextUrl.clone();
  url.pathname = Enums.PATH.DEFAULT;

  const urlCurrent = req.nextUrl.pathname
  const routePrivate = [Enums.PATH.ACCOUNT._, Enums.PATH.ACCOUNT.ADDRESS]

  const cookies = req.cookies;
  const auth = parseJson(cookies[hashMD5(configJson.cookies.auth)])

  let dataToken;
  if (auth && auth.token && auth.refreshToken) {
    dataToken = await handleToken(auth)
  }

  if (routePrivate.includes(urlCurrent)) {
    if (isEmpty(dataToken)) return NextResponse.redirect(url)

    if (dataToken.role !== ROLE.ACCOUNT || dataToken.status === USER_STATUS.LOCKED) {
      return NextResponse.redirect(url)
    }
  }
}

async function handleToken(auth): Promise<object> {

  // const secret = process.env.STRIPE_SECRET_KEY // mock
  const secret = process.env.NEXT_PUBLIC_JWT_SECRET
  const dataToken = await verifyToken(auth.token, secret)
  const refreshToken = await verifyToken(auth.refreshToken, secret)
  const now = Math.floor(Date.now() / 1000);

  // case require verify token success
  if (dataToken && refreshToken) {

    // case refresh if token expired ( refreshToken expired )
    // if (dataToken.exp > now && refreshToken.exp > now) { // mock
    if (dataToken.exp < now && refreshToken.exp < now) {
      console.log('dauphaihau debug: run case token + refreshToken expired ')
      return null
    }

    // case token still work
    // console.log('dauphaihau debug: token still work')
    return dataToken
  }
  return null
}

import { NextRequest, NextResponse } from 'next/server';

import { PATH, ROLE, USER_STATUS } from 'config/const';
import { hashMD5 } from 'lib/crypto';
import { isEmptyObject, parseJSON } from 'core/helpers';
import { ICustomer, IToken } from "types/customer";
import { config } from "config";

export async function middleware(req: NextRequest) {

  const home = req.nextUrl.clone();
  home.pathname = PATH.HOME;

  const urlCurrent = req.nextUrl.pathname
  const routesPrivate = [PATH.ACCOUNT._, PATH.ACCOUNT.ADDRESS]
  const routesAuth = [PATH.ACCOUNT.LOGIN, PATH.ACCOUNT.REGISTER, PATH.ACCOUNT.FORGOT_PASSWORD, PATH.ACCOUNT.RESET_PASSWORD]

  const cookies = req.cookies;
  const authData = parseJSON<IToken>(cookies[hashMD5(config.cookies.auth)])
  const profile = parseJSON<ICustomer>(cookies[hashMD5(config.cookies.profile)])

  const now = new Date().getTime();
  const isAuth = Boolean(authData && authData.token && authData.refreshAt && now < authData.expiredAt && profile)

  if (routesAuth.includes(urlCurrent)) {

    if (urlCurrent === PATH.ACCOUNT.RESET_PASSWORD) {
      const urlSearchParams = new URLSearchParams(req.nextUrl.search);
      const params = Object.fromEntries(urlSearchParams.entries())
      if (isEmptyObject(params)) return NextResponse.redirect(home)
    }

    if (isAuth) return NextResponse.redirect(home)
  }

  if (routesPrivate.includes(urlCurrent)) {
    if (!isAuth) return NextResponse.redirect(home)

    if (profile.role !== ROLE.ACCOUNT || profile.status === USER_STATUS.LOCKED) {
      return NextResponse.redirect(home)
    }
  }

}

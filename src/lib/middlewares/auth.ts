import { verifyToken } from "lib/jwt";
import { parseJSON } from "core/helpers";
import { IToken } from "types/customer";

const secret = process.env.NEXT_PUBLIC_JWT_SECRET
const now = Math.floor(Date.now() / 1000);

export const isAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  const authData = authorization?.replace('Bearer ', '');
  const { token, refreshToken } = parseJSON<IToken>(authData)
  const dataToken = await verifyToken(token, secret)
  const dataRefreshToken = await verifyToken(refreshToken, secret)

  if (!dataToken || !dataRefreshToken) {
    console.log('dauphaihau debug: run case refreshToken & token not found')
    res.status(401).send({ code: '401', message: 'Token is not valid' });
  }

  // 1. refreshToken & token expired --> re-login
  // if (dataToken.exp > now && dataRefreshToken.exp > now) { // mock
  if (dataToken.exp < now && dataRefreshToken.exp < now) {
    console.log('dauphaihau debug: run case refreshToken & token expired')
    return res.status(401).send({ code: '401', message: 'Token is not valid' });
  }

  // 2. refreshToken works - token expired
  // if (dataToken.exp > now && dataRefreshToken.exp > now) { // mock
  if (dataToken.exp < now && dataRefreshToken.exp > now) {
    console.log('dauphaihau debug: run case refreshToken works - token expired')
    return res.status(401).send({ code: '4001', message: 'Token is expired' });
  }

  // console.log('dauphaihau debug: data-token ', dataToken)
  req.customer = dataToken
  next()
};

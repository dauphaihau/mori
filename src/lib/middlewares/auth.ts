import { verifyToken } from "lib/jwt";
import { parseJSON } from "core/helpers";
import { IToken } from "types/token";

const secret = process.env.NEXT_PUBLIC_JWT_SECRET
const now = new Date().getTime();

export const isAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  const authData = authorization?.replace('Bearer ', '');
  const { token } = parseJSON<IToken>(authData)
  const dataToken = await verifyToken(token, secret)

  if (!dataToken) {
    console.log('dauphaihau debug: run case token not found')
    res.status(401).send({ code: '401', message: 'Token is not valid' });
  }

  // if (dataToken.exp > now) { // mock
  if (dataToken.exp < now) {
    console.log('dauphaihau debug: run case token expired')
    return res.status(401).send({ code: '4001', message: 'Token is expired' });
  }

  req.customer = dataToken
  next()
};

import { verifyToken } from "lib/jwt";

export const isAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization.replace('Bearer ', '');
  const dataToken = await verifyToken(token, process.env.NEXT_PUBLIC_JWT_SECRET)
  if (!dataToken) return res.status(401).send({ code: '401', message: 'Token is not valid' });
  req.customer = dataToken
  next()
};

// export function isLoggedIn(req, res, next) {
//   if (req.user) {
//     next();
//   } else {
//     // return unauthorized
//     res.send(401, "Unauthorized");
//   }
// }

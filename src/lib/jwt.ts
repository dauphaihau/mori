import { SignJWT, jwtVerify, type JWTPayload } from 'jose';
import { BASE_URL } from "config/const";

export async function signToken(
  payload: JWTPayload,
  secret: string,
  timeExp: number | string
): Promise<string> {
  const now = new Date().getTime();
  const nbf = Math.floor(Date.now() / 1000);

  return new SignJWT({ ...payload })
  .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
  .setExpirationTime(timeExp)
  .setIssuedAt()
  .setNotBefore(nbf)
  .setAudience(`${BASE_URL}/api`)
  .setIssuer(BASE_URL)
  // .setSubject()
  .sign(new TextEncoder().encode(secret));
}

export async function verifyToken(token: string, secret: string): Promise<JWTPayload> {
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret), {
      issuer: BASE_URL,
      audience: `${BASE_URL}/api`,
      algorithms: ["HS256"],
    });
    console.log('dauphaihau debug: payload', payload)
    return payload;
  } catch (error) {
    return null;
  }
}

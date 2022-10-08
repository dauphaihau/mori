import { SignJWT, jwtVerify, type JWTPayload } from 'jose';
// const { publicRuntimeConfig } = getConfig();

export async function signToken(
  payload: JWTPayload,
  secret: string,
  timeExp: number
): Promise<string> {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + timeExp;

  return new SignJWT({ ...payload })
  .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
  .setExpirationTime(exp)
  .setIssuedAt(iat)
  .setNotBefore(iat)
  .sign(new TextEncoder().encode(secret));
}

export async function verifyToken(token: string, secret: string): Promise<JWTPayload> {
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
    return payload;
  } catch (error) {
    return null;
  }
}

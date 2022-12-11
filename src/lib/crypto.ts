import CryptoJS from "crypto-js";

export const hashMD5 = (text: string) => {
  return CryptoJS.MD5(text).toString()
}

export const encryptPassword = (text: string, key: string) => {
  const keyUtf = CryptoJS.enc.Utf8.parse(key);
  const iv = CryptoJS.enc.Base64.parse(key);
  const enc = CryptoJS.AES.encrypt(text, keyUtf, { iv });
  return enc.toString()
}

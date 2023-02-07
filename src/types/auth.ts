import { ICustomer } from "./customer";

export type AuthCustomer = {
  auth: {
    token: string,
    refreshToken: string,
    expiredAt: number
  },
  profile: ICustomer,
};

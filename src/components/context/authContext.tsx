import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { useRouter } from "next/router";

import { getCookie, removeCookie, setCookie } from 'lib/cookie';
import { config } from 'config';
import { IToken } from 'types/token';
import { PATH } from "config/const";
import { ICustomer } from "types/customer";
import { AuthCustomer } from "types/auth";
import { accountService } from "services/account";

export interface AuthProps {
  customer: Partial<ICustomer>
  logout: () => void
  loginRegisterSuccess: (authCustomer: AuthCustomer) => void;
  isAuthenticated: boolean
}

const initialState = {
  customer: null,
  isAuthenticated: false,
  // isLoading: true,
};

export const AuthContext = createContext<Partial<AuthProps>>(initialState)

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: PropsWithChildren<{}>) {
  const [customer, setCustomer] = useState<ICustomer | null>();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const now = new Date().getTime();
    const authData = getCookie<IToken>(config.cookies.auth)
    const profile = getCookie<ICustomer>(config.cookies.profile)

    if (authData && authData.token && authData.refreshAt && now < authData.expiredAt) {
      setIsAuthenticated(true)
      setCustomer(profile)

      if (now > authData.refreshAt) {
        logout()
      }

      // if (now < authData.expiredAt) { // mock
      if (now > authData.expiredAt) {

        (async () => {
          const { data, status } = await accountService.refreshToken(authData.token)
          console.log('dauphaihau debug: status', status)

          if (status === 401) {
            logout()
          }

          if (status === 200) {
            const expiredAt = new Date(data.auth.expiredAt);
            setCookie(config.cookies.auth, data.auth, expiredAt)
          }
        })()
      }

    } else {
      logout()
    }
  }, []);

  const logout = () => {
    setIsAuthenticated(false)
    setCustomer(null)
    removeCookie(config.cookies.auth)
    removeCookie(config.cookies.profile)
  }

  const loginRegisterSuccess = (authCustomer) => {
    setIsAuthenticated(true)
    setCustomer(authCustomer.profile)
    router.push(PATH.ACCOUNT._)

    const expiredAt = new Date(authCustomer.auth.expiredAt);
    setCookie(config.cookies.auth, authCustomer.auth, expiredAt)
    setCookie(config.cookies.profile, authCustomer.profile, expiredAt)
  }

  const providerValues: AuthProps = {
    logout, loginRegisterSuccess, customer, isAuthenticated
  };

  return (
    <AuthContext.Provider value={providerValues}>{children}</AuthContext.Provider>
  );
}

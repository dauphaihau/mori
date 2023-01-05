import { useState, useEffect, PropsWithChildren, createContext, useContext } from 'react';

import { accountService } from 'services/account';
import { handleGetCookie, handleRemoveCookie, handleSetCookie } from 'lib/cookie';
import { isEmpty } from 'core/helpers';
import config from 'config/config.json';
import { IToken, IUser } from 'types/user';
import { PATH, ROLE } from "config/const";
import { useRouter } from "next/router";
import { signToken, verifyToken } from "lib/jwt";
import { useSafeContext } from "core/hooks";

export interface AuthProps {
  user: IUser
  setUser: (prevState) => void,
  handleLogout: () => void,
  role: number
}

const initialState = {
  user: {
    role: ROLE.BASIC
  },
  setUser: () => {},
};

// export const [useAuth, Provider] = useSafeContext<AuthProps>(initialState)

export const AuthContext = createContext<AuthProps>(initialState)

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: PropsWithChildren<{}>) {
  const [user, setUser] = useState<IUser | null>();
  const [role, setRole] = useState(ROLE.BASIC)
  const router = useRouter();

  useEffect(() => {
    const authData = handleGetCookie<IToken>(config.cookies.auth)

    console.log('dauphaihau debug: auth-data', authData)

    if (authData && authData.token && authData.refreshToken) {
      // console.log('dauphaihau debug: has auth data')

      const verifyAuth = async () => {
        const dataToken = await handleToken(authData)
        console.log('dauphaihau debug: data-token', dataToken)

        if (dataToken) {
          // console.log('dauphaihau debug: data-token', dataToken)
          setUser({ ...user, ...dataToken })
          // setRole(ROLE.ACCOUNT)
        } else {

        }
      }
      verifyAuth();
    } else {
      // handleLogout()
    }

    // if (!isEmpty(auth) && !isEmpty(profile)) {
    //   console.log('dauphaihau debug: has cookie dataToken')
    //   const verifyAuth = async () => {
    //     const { isSuccess, data } = await accountService.me();
    //     if (isSuccess) {
    //       setUser({ ...(user as object), ...data })
    //       setIsAuthorize(true)
    //     } else {
    //       setIsAuthorize(false)
    //     }
    //   }
    //   verifyAuth();
    // } else {
    //   handleLogout()
    // }
  }, [router.asPath]);

  const handleLogout = () => {
    handleRemoveCookie(config.cookies.auth)
    handleRemoveCookie(config.cookies.profile)
    router.push(PATH.HOME);
    // setUser({ numberAllOfItemsInCart: user.numberAllOfItemsInCart })

    setRole(ROLE.BASIC);
    setUser({ ...user, role: ROLE.BASIC });
  }

  const handleToken = async (authData) => {

    // const secret = process.env.STRIPE_SECRET_KEY // mock
    const secret = process.env.NEXT_PUBLIC_JWT_SECRET
    const dataToken = await verifyToken(authData.token, secret)
    const refreshToken = await verifyToken(authData.refreshToken, secret)
    const now = Math.floor(Date.now() / 1000);

    // case require verify token success
    if (dataToken && refreshToken) {

      // 1. refreshToken & token expired
      // if (dataToken.exp > now && refreshToken.exp > now) { // mock
      if (dataToken.exp < now && refreshToken.exp < now) {
        console.log('dauphaihau debug: run case token + refreshToken expired ')
        return null
      }

      // 2. refreshToken works - token expired
      // if (dataToken.exp > now && refreshToken.exp > now) { // mock
      if (dataToken.exp < now && refreshToken.exp > now) {
        console.log('dauphaihau debug: run case token expired')

        const newToken = await signToken(dataToken, secret, config.token.tokenLife);
        const newDataToken = await verifyToken(newToken, secret)

        // console.log('dauphaihau debug: data-token-token', dataToken)
        // console.log('dauphaihau debug: new-data-token', newDataToken)

        // console.log('dauphaihau debug: token-auth-token', newToken === authData.token)
        authData.token = newToken
        // console.log('dauphaihau debug: token-auth-token', newToken === authData.token)

        handleSetCookie(config.cookies.auth, authData)
        return newDataToken
      }

      // default
      // console.log('dauphaihau debug: token still work')
      return dataToken
    }
    return null
  }

  const providerValues: AuthProps = {
    user, handleLogout, setUser, role
  };

  return (
    <AuthContext.Provider value={providerValues}>{children}</AuthContext.Provider>
  );
}

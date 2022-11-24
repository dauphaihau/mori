import { createContext, useContext, useState, useEffect, FC } from 'react';

import { accountService } from 'services/account';
import { handleGetCookie, handleRemoveCookie, handleSetCookie } from 'lib/cookie';
import { isEmpty } from 'core/helpers';
import config from 'config/config.json';
import { IUser } from 'types/user';
import Const from "config/const";
import { useRouter } from "next/router";
import { signToken, verifyToken } from "lib/jwt";
import useSafeContext from "../core/hooks/useSafeContext";

export interface AuthState {
  user: IUser
  setUser: (prevState) => void,
  handleLogout: () => void,
  role: number
}

const initialState = {
  user: {
    role: Const.ROLE.BASIC
  },
  setUser: () => {
  },
};

export const [useAuth, Provider] = useSafeContext<AuthState>(initialState)

// const AuthContext = createContext<Partial<AuthState>>(initialState);
//
// export function useAuth() {
//   return useContext(AuthContext);
// }

export const AuthProvider: FC = ({ children }) => {
  const [user, setUser] = useState<IUser | null>();
  const [role, setRole] = useState(Const.ROLE.BASIC)
  const router = useRouter();

  useEffect(() => {
    const authData = handleGetCookie(config.cookies.auth)

    // console.log('dauphaihau debug: run auth Context')

    // console.log('dauphaihau debug: auth', auth)
    // console.log('dauphaihau debug: profile', profile)

    if (authData && authData.token && authData.refreshToken) {
      // console.log('dauphaihau debug: has auth data')

      const verifyAuth = async () => {
        const dataToken = await handleToken(authData)

        if (dataToken) {
          // console.log('dauphaihau debug: data-token', dataToken)
          setUser({ ...(user as object), ...dataToken })
          // setRole(Const.ROLE.ACCOUNT)
        }
      }
      verifyAuth();
    } else {
      handleLogout()
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
    // setUser({ numberAllOfItemsInCart: user.numberAllOfItemsInCart })
    // router.push(Const.PATH.DEFAULT);
    setRole(Const.ROLE.BASIC);
    setUser({ ...user, role: Const.ROLE.BASIC });
    // setUser({...user, role: Const.ROLE.BASIC});
  }

  const handleToken = async (authData) => {

    // const secret = process.env.STRIPE_SECRET_KEY // mock
    const secret = process.env.NEXT_PUBLIC_JWT_SECRET
    const dataToken = await verifyToken(authData.token, secret)
    const refreshToken = await verifyToken(authData.refreshToken, secret)
    const now = Math.floor(Date.now() / 1000);

    // case require verify token success
    if (dataToken && refreshToken) {

      // case refresh if token expired ( refreshToken expired )
      // if (dataToken.exp > now && refreshToken.exp > now) { // mock
      if (dataToken.exp < now && refreshToken.exp < now) {
        console.log('dauphaihau debug: run case token + refreshToken expired ')
        return null
      }

      // case refresh if token expired ( refreshToken work )
      // if (dataToken.exp > now && refreshToken.exp > now) { // mock
      if (dataToken.exp < now && refreshToken.exp > now) {
        console.log('dauphaihau debug: run case token expired')

        const token = await signToken(dataToken, secret, config.token.tokenLife);

        // console.log('dauphaihau debug: data-token-token', dataToken)
        const newDataToken = await verifyToken(token, secret)
        // console.log('dauphaihau debug: new-data-token', newDataToken)

        // console.log('dauphaihau debug: token-auth-token', token === auth.token)
        authData.token = token
        // console.log('dauphaihau debug: token-auth-token', token === auth.token)

        // console.log('dauphaihau debug: auth', auth)

        handleSetCookie(config.cookies.auth, authData)
        return newDataToken
      }

      // case token still work
      // console.log('dauphaihau debug: token still work')
      return dataToken
    }
    return null
  }

  const providerValues: AuthState = {
    user, handleLogout, setUser, role
  };

  return (
    <Provider value={providerValues}>{children}</Provider>
    // <AuthContext.Provider value={providerValues}>{children}</AuthContext.Provider>
  );
}

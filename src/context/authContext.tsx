import { useState, useEffect, PropsWithChildren } from 'react';

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

export const [useAuth, Provider] = useSafeContext<AuthProps>(initialState)

export function AuthProvider({ children }: PropsWithChildren<{}>) {
  const [user, setUser] = useState<IUser | null>();
  const [role, setRole] = useState(ROLE.BASIC)
  const router = useRouter();

  useEffect(() => {
    const authData = handleGetCookie<IToken>(config.cookies.auth)
    if (authData && authData.token && authData.refreshToken) {
      // console.log('dauphaihau debug: has auth data')

      const verifyAuth = async () => {
        const dataToken = await handleToken(authData)

        if (dataToken) {
          // console.log('dauphaihau debug: data-token', dataToken)
          setUser({ ...(user as object), ...dataToken })
          // setRole(ROLE.ACCOUNT)
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
    // setUser({ numberAllOfItemsInCart: user.numberAllOfItemsInCart })
    router.push(PATH.HOME);
    setRole(ROLE.BASIC);
    setUser({ ...user, role: ROLE.BASIC });
    // setUser({...user, role: ROLE.BASIC});
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

  const providerValues: AuthProps = {
    user, handleLogout, setUser, role
  };

  return (
    <Provider value={providerValues}>{children}</Provider>
  );
}

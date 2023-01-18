import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';

import { handleGetCookie, handleRemoveCookie } from 'lib/cookie';
import { config } from 'config';
import { IToken, IUser } from 'types/user';
import { PATH, ROLE } from "config/const";
import { useRouter } from "next/router";
import { verifyToken } from "../../lib/jwt";

export interface AuthProps {
  user: IUser
  setUser: (prevState) => void,
  handleLogout: () => void,
  role: number
}

const initialState = {
  user: { role: ROLE.BASIC },
  setUser: () => {},
};

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

    if (authData && authData.token && authData.refreshToken) {
      // const secret = process.env.NEXT_PUBLIC_JWT_SECRET
      // const dataToken = awverifyToken(authData.token, secret)
      // console.log('dauphaihau debug: data-token', dataToken)
      setRole(ROLE.ACCOUNT)

      // console.log('dauphaihau debug: has auth data')

      // const verifyAuth = async () => {
      //   const dataToken = await handleToken(authData)
      //   console.log('dauphaihau debug: data-token', dataToken)
      //
      //   if (dataToken) {
      //     // console.log('dauphaihau debug: data-token', dataToken)
      //     setUser({ ...user, ...dataToken })
      //     // setRole(ROLE.ACCOUNT)
      //   } else {
      //
      //   }
      // }
      // verifyAuth();
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
  // }, []);
  }, [router.asPath]);

  const handleLogout = () => {
    handleRemoveCookie(config.cookies.auth)
    handleRemoveCookie(config.cookies.profile)
    router.push(PATH.HOME);
    // setUser({ numberAllOfItemsInCart: user.numberAllOfItemsInCart })

    setRole(ROLE.BASIC);
    setUser({ ...user, role: ROLE.BASIC });
  }

  const providerValues: AuthProps = {
    user, handleLogout, setUser, role
  };

  return (
    <AuthContext.Provider value={providerValues}>{children}</AuthContext.Provider>
  );
}

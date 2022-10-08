import React, { ReactNode, useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

import { useUIController } from '../../context/UIControllerContext';
import Header from './Header';
import Footer from './Footer';

const ChatBox = dynamic(() => import('./ChatBox'), { ssr: false });
import BannerSlogan from '../pages/home/BannerSlogan';
import { Box } from 'core/components';
import { AddressDialog, SubscribeDialog } from 'components/dialog';
import { clns } from 'core/helpers';
import AcceptCookie from "./AcceptCookie";
import FreeShip from "./FreeShip";

interface LayoutType {
  children: ReactNode;
  categories: [],
}

const Layout = ({ children, categories }: LayoutType) => {
  const [isMobileScreen, setIsMobileScreen] = useState(false)
  const [accountLayout, setAccountLayout] = useState(false)
  const router = useRouter();

  useEffect(() => {
    if (window.matchMedia('(max-width: 414px)').matches) {
      setIsMobileScreen(true)
    }
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0);
    const arrPathAccount = ['forgot-password', 'reset-password']
    if (arrPathAccount.includes(router.pathname.slice(9))) {
      setAccountLayout(true)
    } else setAccountLayout(false)
  }, [router.asPath])

  return (
    <>
      <Toaster
        position={isMobileScreen ? 'top-center' : 'bottom-right'}
        reverseOrder={false}
      />

      {/*<SubscribeDialog/>*/}
      <AddressDialog/>
      {/*<ChatBox/>*/}

      {/*<FreeShip/>*/}
      <Header categories={categories}/>

      <Box>
        <Box
          main
          classes={accountLayout ? 'flex items-center h-screen' : ''}
        >{children}</Box>
        <Footer/>
      </Box>
      {/*<AcceptCookie/>*/}
    </>
  );
}

export default Layout

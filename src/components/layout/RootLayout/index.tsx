import React, { ReactNode, useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';
import LoadingBar from "react-top-loading-bar";
import dynamic from 'next/dynamic';

import { useUIController } from 'context/UIControllerContext';
import Header from './Header';
import Footer from './Footer';

import ChatBox from './ChatBox';
// const ChatBox = dynamic(() => import('./ChatBox'), { ssr: false });

import BannerSlogan from '../../pages/home/BannerSlogan';
import { Box } from 'core/components';
import { AddressDialog, SubscribeDialog } from 'components/dialog';
import { cn } from 'core/helpers';
import AcceptCookie from "./AcceptCookie";
import FreeShip from "./FreeShip";

export default function RootLayout({ children }: {children: ReactNode}) {
  const { progress, setProgress } = useUIController();
  const [isMobileScreen, setIsMobileScreen] = useState(false)
  const router = useRouter();

  useEffect(() => {
    if (window.matchMedia('(max-width: 414px)').matches) {
      setIsMobileScreen(true)
    }
  }, [])

  return (
    <>
      <LoadingBar
        color='#000000'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        height={2}
      />
      <Toaster
        position={isMobileScreen ? 'top-center' : 'bottom-right'}
        reverseOrder={false}
      />

      {/*<SubscribeDialog/>*/}
      <AddressDialog/>
      {/*<ChatBox/>*/}

      {/*<FreeShip/>*/}
      <Header/>

      <Box>
        <Box main>{children}</Box>
        <Footer/>
      </Box>
      {/*<AcceptCookie/>*/}
    </>
  );
}

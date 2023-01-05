import React, { ReactNode, useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import LoadingBar from "react-top-loading-bar";
import dynamic from 'next/dynamic';

import { useUIController } from 'components/context/UIControllerContext';
import Header from './Header';
import Footer from './Footer';

// import ChatBox from './ChatBox';
// const ChatBox = dynamic(() => import('./ChatBox'), { ssr: false });

import BannerSlogan from '../../pages/home/BannerSlogan';
import { Box } from 'core/components';
import { SubscribeDialog } from 'components/dialog';
import AcceptCookie from "./AcceptCookie";
import FreeShip from "./FreeShip";

export default function RootLayout({ children }: {children: ReactNode}) {
  // const { progress, setProgress } = useUIController();
  const [isMobileScreen, setIsMobileScreen] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(max-width: 414px)').matches) {
      setIsMobileScreen(true)
      return () => setIsMobileScreen(false)
    }
  }, [])

  return (
    <>
      {/*<LoadingBar*/}
      {/*  color='#000000'*/}
      {/*  progress={progress}*/}
      {/*  onLoaderFinished={() => setProgress(0)}*/}
      {/*  height={2}*/}
      {/*/>*/}
      <Toaster
        position={isMobileScreen ? 'top-center' : 'bottom-right'}
        reverseOrder={false}
      />

      {/*<SubscribeDialog/>*/}
      {/*<AcceptCookie/>*/}
      {/*<ChatBox/>*/}

      <FreeShip/>
      <Header/>

      <Box>
        <Box main>{children}</Box>
        <Footer/>
      </Box>
    </>
  );
}

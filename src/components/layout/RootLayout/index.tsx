import React, { ReactNode, useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import dynamic from 'next/dynamic';

import Header from './Header';
import Footer from './Footer';

// import ChatBox from './ChatBox';
// const ChatBox = dynamic(() => import('./ChatBox'), { ssr: false });

import { Box } from 'core/components';
import { SubscribeDialog } from 'components/dialog';
import AcceptCookie from "./AcceptCookie";
import FreeShip from "./FreeShip";

export default function RootLayout({ children }: {children: ReactNode}) {
  const [isMobileScreen, setIsMobileScreen] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(max-width: 414px)').matches) {
      setIsMobileScreen(true)
      return () => setIsMobileScreen(false)
    }
  }, [])

  return (
    <>
      <Toaster
        position={isMobileScreen ? 'top-center' : 'bottom-center'}
        reverseOrder={false}
      />
      <FreeShip/>
      <Header/>
      <Box classes=''>
      {/*<Box classes='mt-3 laptop:mt-1'>*/}
        <Box main classes='mb-16'>{children}</Box>
        <Footer/>
      </Box>

      {/*<SubscribeDialog/>*/}
      {/*<AcceptCookie/>*/}

      {/* @ts-ignore*/}
      {/*<ChatBox/>*/}
    </>
  );
}

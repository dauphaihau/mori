import React from "react";
import { HydrationProvider, Client } from "react-hydration-provider";

import 'react-tippy/dist/tippy.css'
import '../assets/styles/global.scss'

import RootLayout from "components/layout/RootLayout";
import { AuthProvider } from "context/authContext";
import { UIControllerProvider } from "context/UIControllerContext";
import SizeObserver from "context/sliderContext";

function EcommerceApp({ Component, pageProps }) {
  return (
    <HydrationProvider>
      <Client>
        <AuthProvider>
          <UIControllerProvider>
            <SizeObserver>
              <RootLayout>
                <Component {...pageProps} />
              </RootLayout>
            </SizeObserver>
          </UIControllerProvider>
        </AuthProvider>
      </Client>
    </HydrationProvider>
  )
}

export default EcommerceApp

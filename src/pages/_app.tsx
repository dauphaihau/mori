import React from "react";
import { HydrationProvider, Client } from "react-hydration-provider";

import 'react-tippy/dist/tippy.css'
import '../assets/styles/global.scss'

import RootLayout from "components/layout/RootLayout";
import { AuthProvider } from "components/context/authContext";
import { UIControllerProvider } from "components/context/UIControllerContext";
import SizeObserver from "components/context/sliderContext";

export default function EcommerceApp({ Component, pageProps }) {
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

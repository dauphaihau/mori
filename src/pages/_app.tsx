import React from "react";
import { HydrationProvider, Client } from "react-hydration-provider";

import 'react-tippy/dist/tippy.css'
import '../assets/styles/global.scss'

import RootLayout from "components/layout/RootLayout";
import { AuthProvider } from "components/context/authContext";
import { UIControllerProvider } from "components/context/UIControllerContext";
import SizeObserver from "components/context/sliderContext";
import { CartProvider } from "components/context/cartContext";

export default function EcommerceApp({ Component, pageProps }) {
  return (
    <HydrationProvider>
      <Client>
        <AuthProvider>
          <CartProvider>
            <UIControllerProvider>
              <SizeObserver>
                <RootLayout>
                  <Component {...pageProps} />
                </RootLayout>
              </SizeObserver>
            </UIControllerProvider>
          </CartProvider>
        </AuthProvider>
      </Client>
    </HydrationProvider>
  )
}

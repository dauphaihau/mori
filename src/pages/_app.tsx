import React from "react";

import 'react-tippy/dist/tippy.css'
import '../assets/styles/global.scss'

import Layout from "components/layout";
import { AuthProvider } from "context/authContext";
import { UIControllerProvider } from "context/UIControllerContext";
import SizeObserver from "context/sliderContext";

function EcommerceApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <UIControllerProvider>
        <SizeObserver>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SizeObserver>
      </UIControllerProvider>
    </AuthProvider>
  )
}

// EcommerceApp.getInitialProps = async () => {
//   return {
//     footerData: footerHomePageData
//   }
// }

export default EcommerceApp

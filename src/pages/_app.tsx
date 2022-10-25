import React from "react";
import '../assets/styles/global.scss'
import Layout from "components/layout";
import { data as footerHomePageData } from '../assets/data/FooterData';
import fetchCategories from 'assets/data/InventoryData/provider/categoryProvider';
import { AuthProvider } from "context/authContext";
import { UIControllerProvider } from "context/UIControllerContext";
import FilterProvider from "context/filterContext";
import SizeObserver from "context/sliderContext";
// import axios from 'axios';
// axios.defaults.baseURL = process.env.BASE_URL;

function EcommerceApp({ categories, Component, pageProps }) {
  return (
    <AuthProvider>
      <UIControllerProvider>
        <FilterProvider>
          <SizeObserver>
            <Layout categories={categories}>
              <Component {...pageProps} />
            </Layout>
          </SizeObserver>
        </FilterProvider>
      </UIControllerProvider>
    </AuthProvider>
  )
}

EcommerceApp.getInitialProps = async () => {

  const categories = await fetchCategories()
  return {
    categories,
    footerData: footerHomePageData
  }
}

export default EcommerceApp

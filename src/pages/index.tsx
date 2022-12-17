import React from "react";

import {
  Contact,
  FlashSaleProducts,
  SpecialProduct,
  ClientLogo,
  ShopByCategories,
  RealLifeImages,
  BannerSlogan,
  FeedBack,
} from 'components/pages/home';
import Seo from 'components/common/Seo';

export default function HomePage() {
  return (
    <>
      <Seo/>

      <BannerSlogan/>
      <SpecialProduct/>
      <FlashSaleProducts/>
      <ShopByCategories/>
      <ClientLogo/>
      <RealLifeImages/>
      <FeedBack/>
      <Contact/>
    </>
  )
}

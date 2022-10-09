import { fetchInventory } from 'assets/data/InventoryData/provider/inventoryProvider';
import { CarouselBanner, Contact, FlashSaleProducts, HomeBannerCard, MemberServices } from 'components/pages/home';
import Seo from 'components/common/Seo';
import BannerSlogan from 'components/pages/home/BannerSlogan';
import SpecialProduct from "../components/pages/home/SpecialProduct";
import Testimonials from "../components/pages/home/Testimonials";
import ClientLogo from "../components/pages/home/ClientLogo";
import ShopByCategories from "../components/pages/home/ShopByCategories";
import inventoryForCategory from "../assets/data/InventoryData/inventoryForCategory";
import inventoryCategories from "../assets/data/InventoryData/inventoryCategories";
import RealLifeImages from "../components/pages/home/RealLifeImages";
import fetchCategories from "../assets/data/InventoryData/provider/categoryProvider";
import { Transition } from '@headlessui/react';

const HomePage = ({ inventoryData = [], categoriesData , categories}) => {
  return (
    <>
      <Seo/>
      <BannerSlogan/>
      <SpecialProduct data={inventoryData[13]}/>
      <FlashSaleProducts inventoryData={inventoryData}/>
      <ShopByCategories
        // inventoryData={inventoryData}
        categoriesData={categoriesData}
        // categories={categories}
      />
      <RealLifeImages categoriesData={categoriesData}/>

      <ClientLogo/>
      <Testimonials/>
      {/*<MemberServices/>*/}
      <Contact/>
      {/*<CarouselBanner/>*/}
    </>
  )
}

export async function getStaticProps() {
  const inventory = await fetchInventory()

  const categories = await fetchCategories()
  const categoriesData = await inventoryCategories()
  return {
    props: {
      inventoryData: inventory,
      categories: categories,
      categoriesData: categoriesData
    }
  }
}

export default HomePage

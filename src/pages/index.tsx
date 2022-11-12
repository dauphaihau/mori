import { fetchInventory } from 'assets/data/InventoryData/provider/inventoryProvider';
import { Contact, FlashSaleProducts } from 'components/pages/home';
import Seo from 'components/common/Seo';
import SpecialProduct from "../components/pages/home/SpecialProduct";
import ClientLogo from "../components/pages/home/ClientLogo";
import ShopByCategories from "../components/pages/home/ShopByCategories";
import inventoryCategories from "../assets/data/InventoryData/inventoryCategories";
import RealLifeImages from "../components/pages/home/RealLifeImages";
import BannerSlogan from "../components/pages/home/BannerSlogan";
import FeedBack from "../components/pages/home/FeedBack";
import Product from 'server/models/Product';
import db from 'server/config/db';

const HomePage = ({ inventoryData = [], categoriesData }) => {
  return (
    <>
      <Seo/>

      <BannerSlogan/>
      <SpecialProduct data={inventoryData[13]}/>
      <FlashSaleProducts inventoryData={inventoryData}/>
      <ShopByCategories categoriesData={categoriesData}/>
      <RealLifeImages categoriesData={categoriesData}/>
      <ClientLogo/>
      <FeedBack/>
      <Contact/>
    </>
  )
}

export async function getStaticProps() {
  const inventory = await fetchInventory()
  const categoriesData = await inventoryCategories()
  return {
    props: {
      inventoryData: inventory,
      categoriesData: categoriesData
    }
  }
}

export default HomePage

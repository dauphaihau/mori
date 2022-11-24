import { fetchInventory } from 'assets/data/InventoryData/provider/inventoryProvider';
import { Contact, FlashSaleProducts } from 'components/pages/home';
import Seo from 'components/common/Seo';
import SpecialProduct from "../components/pages/home/SpecialProduct";
import ClientLogo from "../components/pages/home/ClientLogo";
import ShopByCategories from "../components/pages/home/ShopByCategories";
import RealLifeImages from "../components/pages/home/RealLifeImages";
import BannerSlogan from "../components/pages/home/BannerSlogan";
import FeedBack from "../components/pages/home/FeedBack";

export default function HomePage() {
  return (
    <>
      <Seo/>

      <BannerSlogan/>
      <SpecialProduct/>
      <FlashSaleProducts/>
      <ShopByCategories/>
      <RealLifeImages/>
      <ClientLogo/>
      <FeedBack/>
      <Contact/>
    </>
  )
}

export async function getStaticProps() {
  const inventory = await fetchInventory()
  // const categoriesData = await inventoryCategories(inventory)
  // console.log('dauphaihau debug: categories-data', categoriesData)

  // const arr = ['62b82018a62d7c58e1c6a8eb']
  // const res = await productService.getProductByIds(arr)

  return {
    props: {
      inventoryData: inventory,
      // categories: JSON.parse(JSON.stringify(categories))
      // categoriesData: categoriesData
    }
  }
}

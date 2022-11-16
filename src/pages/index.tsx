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
import { productService } from "services/product";

const HomePage = ({ inventoryData = [], categories = [] }) => {
  return (
    <>
      <Seo/>

      <BannerSlogan/>
      <SpecialProduct data={inventoryData[13]}/>
      <FlashSaleProducts inventoryData={inventoryData}/>
      <ShopByCategories categories={categories}/>
      <RealLifeImages/>
      <ClientLogo/>
      <FeedBack/>
      <Contact/>
    </>
  )
}

// export async function getStaticProps() {
//   const inventory = await fetchInventory()
//   const arr = ['637240340ceb462471b441ec', '637240340ceb462471b441d3']
//   // const product = Product.find()
//   const res = await getProductByIds(arr)
//   // console.log('dauphaihau debug: http-127-0-0-1-3000-config-api-product', 'http://127.0.0.1:3000' + config.api.product)
//   // const res = await fetch('http://127.0.0.1:3000' + config.api.product, {
//   //   method: 'DELETE',
//   //   body: JSON.stringify(arr)
//   // })
//
//   console.log('dauphaihau debug: res', res)
//   const categoriesData = await inventoryCategories()
//   return {
//     props: {
//       inventoryData: inventory,
//       categoriesData: categoriesData
//     }
//   }
// }

export async function getStaticProps() {
  const inventory = await fetchInventory()
  // const categoriesData = await inventoryCategories(inventory)
  // console.log('dauphaihau debug: categories-data', categoriesData)

  // const arr = ['62b82018a62d7c58e1c6a8eb']
  // const res = await productService.getProductByIds(arr)
  // console.log('dauphaihau debug: res', res)

  const categories = await productService.getCategories()

  return {
    props: {
      inventoryData: inventory,
      // categories: JSON.parse(JSON.stringify(categories))
      // categoriesData: categoriesData
    }
  }
}

export default HomePage

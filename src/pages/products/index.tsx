import { Box, Breadcrumb } from 'core/components';
import { FilterDrawer } from 'components/drawer';
import Seo from 'components/common/Seo';
import Enums from "config/enums";
import FiltersSortMobile from "../../components/pages/products/FiltersSortMobile";
import Products from "../../components/pages/products/Products";
import db from "../../server/db/db";
import { getProducts } from "../../services/products";

const dataBreadcrumb = [
  { path: Enums.PATH.DEFAULT, name: 'Home' },
  { path: Enums.PATH.PRODUCT._, name: 'Products' },
];

const ProductsPage = ({ products }) => {

  console.log('dauphaihau debug: process-env-', process.env.BCRYPT_SALT)

  return (
    <>
      <Seo description='Mori ECommerce - All products'/>

      <FilterDrawer/>
      <Box classes='hidden laptop:block layout pt-16'>
        <Breadcrumb classes='mb-6' data={dataBreadcrumb}/>
        <Products products={products}/>
      </Box>

      {/*Mobile - Tablet version*/}
      <FiltersSortMobile/>
    </>
  );
}

export async function getServerSideProps({ query }) {
  const page = query.page || 1
  const category = query.category || 'all'
  const brand = query.brand || 'all'
  const color = query.color || 'all'
  const sort = query.sort || ''
  const price = query.price || ''

  await db.connect();
  const { products } = await getProducts(
    `?limit=${page * 6}&category=${category}&brand=${brand}&color=${color}&price=${price}&sort=${sort}`
    // `?limit=${page * 6}&category=${category}&brand=${brand}&color=${color}&sort=${sort}`
  )

  return {
    props: {
      products,
      // products: products.map(db.convertDocToObj),
      // categories: categoriesData
    },
  };
}

export default ProductsPage;

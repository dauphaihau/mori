import { Box, Breadcrumb } from 'core/components';
import { FilterDrawer } from 'components/drawer';
import Seo from 'components/common/Seo';
import Enums from "config/enums";
import FiltersSortMobile from "../../components/pages/productList/FiltersSortMobile";
import Products from "../../components/pages/productList/Products";
import db from "../../server/config/db";
import { getProducts } from "../../services/products";
import { GetServerSideProps, NextPage } from "next";
import { IProduct } from "../../types/product";

const dataBreadcrumb = [
  { path: Enums.PATH.DEFAULT, name: 'Home' },
  { path: Enums.PATH.PRODUCT._, name: 'Product' },
];

interface ProductListPageProps {
  data: IProduct[]
}


const ProductListPage: NextPage<ProductListPageProps> = ({ data }) => {

  return (
    <>
      <Seo description='Mori ECommerce - All products'/>

      <FilterDrawer/>
      <Box classes='hidden laptop:block layout desktop:w-[96%] pt-16'>
        <Breadcrumb
          classes='mb-6 pl-1'
          // classes='mb-6 sticky top-20'
          data={dataBreadcrumb}
        />
        <Products data={data}/>
      </Box>

      {/*Mobile - Tablet version*/}
      <FiltersSortMobile/>
    </>
  );
}

const removeUndefinedForNextJsSerializing = <T,>(props: T): T =>
  Object.fromEntries(
    Object.entries(props).filter(([, value]) => value !== undefined),
) as T;

export async function getServerSideProps({ query }) {
  const page: any = query.page || 1
  const category = query.category || 'all'
  const brand = query.brand || 'all'
  const color = query.color || 'all'
  const sort = query.sort || '-createdAt'
  // const sort = query.sort || ''
  const price = query.price || ''

  const data = await getProducts(
    `?limit=${page * 12}&category=${category}&brand=${brand}&color=${color}&price=${price}&sort=${sort}`
  )

  // const test = removeUndefinedForNextJsSerializing({
  //   data: await getProducts(
  //     // `?limit=${page * 6}`
  //     `?limit=${page * 6}&category=${category}&brand=${brand}&color=${color}&sort=${sort}`
  //   )
  // })

  return {
    // props: test ,
    props: {
      data,
      // products: products.map(db.convertDocToObj),
      // categories: categoriesData
    },
  };
}

export default ProductListPage;

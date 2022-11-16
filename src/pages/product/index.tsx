import { Box, Breadcrumb } from 'core/components';
import { FilterDrawer } from 'components/drawer';
import Seo from 'components/common/Seo';
import Enums from "config/enums";
import FiltersSortMobile from "../../components/pages/productList/FiltersSortMobile";
import Products from "../../components/pages/productList/Products";
import { productService } from "services/product";
import { GetServerSideProps, NextPage } from "next";
import { IProduct } from "../../types/product";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const dataBreadcrumb = [
  { path: Enums.PATH.DEFAULT, name: 'Home' },
  { path: Enums.PATH.PRODUCT._, name: 'Product' },
];

interface ProductListPageProps {
  products: IProduct[]
}

// const ProductListPage: NextPage<ProductListPageProps> = () => {
const ProductListPage: NextPage<ProductListPageProps> = ({ products = [] }) => {

  // const [data, setData] = useState(null)
  // const router = useRouter()
  //
  // useEffect(() => {
  //   const initLoad = async () => {
  //     const params = {
  //       page: router.query.page || 1,
  //       category: router.query.category || 'all',
  //       brand: router.query.brand || 'all',
  //       color: router.query.color || 'all',
  //       sort: router.query.sort || '-createdAt',
  //       price: router.query.price || '',
  //     }
  //     const res = await productService.getProducts(params)
  //     // setProducts(res.products)
  //     setData(res)
  //     console.log('dauphaihau debug: res', res)
  //     // console.log('dauphaihau debug: products', products)
  //   }
  //   initLoad()
  //
  // }, [router.asPath])

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

          <Products data={products}/>
        {/*{*/}
        {/*  data && data.products.length > 0 &&*/}
        {/*  <Products data={data}/>*/}
        {/*}*/}
      </Box>

      {/*Mobile - Tablet version*/}
      {/*<FiltersSortMobile/>*/}
    </>
  );
}

export async function getServerSideProps({ query }) {
  const params = {
    page: query.page || 1,
    category: query.category || 'all',
    brand: query.brand || 'all',
    color: query.color || 'all',
    sort: query.sort || '-createdAt',
    price: query.price || '',
  }

  const products = await productService.getProducts(params)

  return {
    props: {
      products,
      // categories: categoriesData
    },
  };
}

export default ProductListPage;

import { Box, Breadcrumb } from 'core/components';
import { FilterDrawer } from 'components/drawer';
import Seo from 'components/common/Seo';
import Enums from "config/enums";
import Products from "../../components/pages/productList/Products";
import { productService } from "services/product";
import { IProduct } from "../../types/product";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import FiltersSortMobile from "../../components/pages/productList/FiltersSortMobile";

const dataBreadcrumb = [
  { path: Enums.PATH.DEFAULT, name: 'Home' },
  { path: Enums.PATH.PRODUCT._, name: 'Product' },
];

interface ProductListPageProps {
  products: IProduct[]
}

export default function ProductListPage<NextPage>() {

  const [data, setData] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const initLoad = async () => {
      const params = {
        page: router.query.page || 1,
        category: router.query.category || 'all',
        brand: router.query.brand || 'all',
        color: router.query.color || 'all',
        sort: router.query.sort || '-createdAt',
        price: router.query.price || '',
      }
      const res = await productService.getProducts(params)
      setData(res)
    }
    initLoad()

  }, [router.asPath])

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

        {
          data?.products && data.products.length > 0 &&
          <Products data={data}/>
        }
      </Box>

      {/*Mobile - Tablet version*/}
      <FiltersSortMobile/>
    </>
  );
}

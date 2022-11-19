import { Box, Breadcrumb, Grid, Row, Text } from 'core/components';
import { FilterDrawer } from 'components/drawer';
import Seo from 'components/common/Seo';
import Enums from "config/enums";
import Products from "../../components/pages/productList/Products";
import { productService, useProducts } from "services/product";
import { IProduct } from "../../types/product";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import FiltersSortMobile from "../../components/pages/productList/FiltersSortMobile";
import { Filters, Sorter } from "../../components/pages/productList";
import { cn } from 'core/helpers';
import { useUIController } from "context/UIControllerContext";

const dataBreadcrumb = [
  { path: Enums.PATH.DEFAULT, name: 'Home' },
  { path: Enums.PATH.PRODUCT._, name: 'Product' },
];

interface ProductListPageProps {
  products: IProduct[]
}

export default function ProductListPage<NextPage>() {
  const { progress, setProgress } = useUIController();
  const router = useRouter()
  const params = {
    page: router.query.page || 1,
    category: router.query.category || 'all',
    brand: router.query.brand || 'all',
    color: router.query.color || 'all',
    sort: router.query.sort || '-createdAt',
    price: router.query.price || '',
  }
  const { data, isLoading } = useProducts(params)
  // setProgress(progress + 30)
  // setProgress(!isLoading && 100)
  // setProgress(isLoading ? 30 : 100)
  console.log('dauphaihau debug: data', data)

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

        <Grid
          sx={5}
          // classes='min-h-full'
        >
          <Filters/>
          <Box classes='w-full col-span-4'>
            <Row
              // ref={ref}
              justify='between'
              // classes='mb-6 sticky top-[80px] z-10 bg-white myElement'
              classes='mb-6 sticky top-[50px] z-10 pt-[25px] pb-4 bg-white myElement'
              // classes='mb-6 sticky top-[80px] z-10 bg-white myElement'
            >
              <Text
                h1
                classes={cn('text-3xl laptop:text-xl font-light', isLoading && 'invisible')}
              >{data?.products.length} results found</Text>
              {/*>{total} results found</Text>*/}
              <Sorter/>
            </Row>
            {data && <Products data={data}/>}
          </Box>
        </Grid>

      </Box>

      {/*Mobile - Tablet version*/}
      <FiltersSortMobile/>
    </>
  );
}

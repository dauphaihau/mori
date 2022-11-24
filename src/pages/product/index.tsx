import { useState } from "react";
import { useRouter } from "next/router";

import { Box, Breadcrumb, Grid, Row, Text } from 'core/components';
import Seo from 'components/common/Seo';
import Const from "config/const";
import Products from "../../components/pages/productList/Products";
import { useProducts } from "services/product";
import MobileTabletVersion from "../../components/pages/productList/MobileTabletVersion";
import { Filters, Sorter } from "../../components/pages/productList";
import { cn } from 'core/helpers';
import { useUIController } from "context/UIControllerContext";
import Viewer from 'components/pages/productList/Viewer';

const dataBreadcrumb = [
  { path: Const.PATH.DEFAULT, name: 'Home' },
  { path: Const.PATH.PRODUCT._, name: 'Product' },
];

export default function ProductListPage<NextPage>() {
  const { progress, setProgress } = useUIController();
  const [gridView, setGridView] = useState(true)
  const router = useRouter()
  const params = {
    page: router.query.page || 1,
    category: router.query.category || 'all',
    material: router.query.material || 'all',
    color: router.query.color || 'all',
    sort: router.query.sort || '-sold',
    // sort: router.query.sort || '-createdAt',
    price: router.query.price || '',
    limit: router.query.limit || '',
  }
  const { data, isLoading } = useProducts(params)
  // setProgress(progress + 30)
  // setProgress(!isLoading && 100)
  // setProgress(isLoading ? 30 : 100)
  // console.log('dauphaihau debug: data', data)

  return (
    <>
      <Seo description='Mori ECommerce - All products'/>

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
              >{data?.total} results found</Text>
              {/*>{total} results found</Text>*/}

              <Row classes='gap-x-8'>
                <Viewer
                  setGridView={setGridView}
                  gridView={gridView}
                />
                <Sorter/>
              </Row>
            </Row>
            {data && <Products
              gridView={gridView}
              data={data}
            />}
          </Box>
        </Grid>
      </Box>

      {/*Mobile - Tablet version*/}
      {data && <MobileTabletVersion data={data}/>}
    </>
  );
}

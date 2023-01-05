import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { Box, Breadcrumb, Grid, Loading, Row, Text } from 'core/components';
import Seo from 'components/common/Seo';
import { PATH, PRODUCT_COLOR } from "config/const";
import Products from "components/pages/productList/Products";
import { useFilters, useProducts } from "services/product";
import MobileTabletVersion from "components/pages/productList/MobileTabletVersion";
import { Filters, Sorter } from "components/pages/productList";
import { capitalizeEachWord, isEmptyObject } from 'core/helpers';
import { useUIController } from "components/context/UIControllerContext";
import InfiniteScroll from 'react-infinite-scroll-component';
import Viewer from 'components/pages/productList/Viewer';
import { IProduct } from "types/product";
import { useScrollDirection, useScrollPosition } from "core/hooks";

const dataBreadcrumb = [
  { path: PATH.DEFAULT, name: 'Home' },
  { path: PATH.PRODUCT._, name: 'Product' },
];

export default function ProductListPage() {
  // const { progress, setProgress } = useUIController();
  const [gridView, setGridView] = useState(true)
  const router = useRouter()
  const scrollDirection = useScrollDirection()
  const scrollPositionY = useScrollPosition();

  const params = {
    // category: router.asPath === PATH.PRODUCT._ ? 'all' : router.query.category,
    category: router.query.category || 'all',
    material: router.query.material || 'all',
    color: router.query.color || 'all',
    sort: router.query.sort || '-sold',
    // sort: router.query.sort || '-createdAt',
    price: router.query.price || '',
    // page: router.query.page || 1,
    // limit: router.query.limit || 18,
  }

  const { products, isValidating, total, isLoading, setSize, size, isReachEnd } = useProducts<IProduct>(params)

  const { colors, materials, prices } = useFilters(router.query?.category)

  useEffect(() => {
    if (!isEmptyObject(router.query)) {
      setSize(1)
    }
  }, [router.query])

  // useEffect(() => {
  //   console.log('dauphaihau debug: run ef 2')
  //   setProgress((prevState) => prevState + 30)
  //   if (!isValidating) {
  //     setProgress(100)
  //   }
  // }, [isValidating])

  return (
    <>
      <Seo description='Mori ECommerce - All products'/>

      <Box classes='hidden laptop:block layout desktop:w-[96%] pt-12'>
        <Breadcrumb
          classes='pl-1'
          data={dataBreadcrumb}
        />
        <Row
          justify='between'
          align='center'
          classes={['sticky top-0 z-20 pt-3 pb-6 bg-white',
            'transition-all duration-500',
            scrollDirection === 'down' ? 'top-0 py-3' : 'top-50 py-6',
            scrollPositionY > 170 ? 'pb-3' : ''
          ]}
        >
          <Text
            h3 classes={[
            'animate flex-1',
            scrollPositionY > 170 ? 'text-lg' : ''
            // scrollPositionY > 170 ? 'scale-75' : 'scale-none'
          ]}
          >
            {(router.query.price as string)?.split(',').length === 1 && prices?.find(item => item.id === router.query.price)?.title} {' '}
            {capitalizeEachWord((router.query.color as string)?.replace('-', ' '))} {' '}
            {capitalizeEachWord(router.query.material as string)} {' '}
            {router.query.category === 'all' || router.asPath === PATH.PRODUCT._ ? 'Coffin, Casket, Urns, Memorials, Shrouds' : capitalizeEachWord(router.query.category as string)} {' '}
            ( {total ?? '-'} results )
          </Text>

          <Row classes='gap-x-8'>
            <Viewer setGridView={setGridView} gridView={gridView}/>
            <Sorter/>
          </Row>
        </Row>

        <Grid sx={5}>
          <Filters/>
          <Box classes='w-full col-span-4'>
            {
              !isLoading &&
              <InfiniteScroll
                next={() => setSize(size + 1)}
                hasMore={!isReachEnd}
                loader={
                  <></>
                  // <Row justify='center'>
                  //   <Loading classes='h-10 w-10'/>
                  // </Row>
                }
                // endMessage={<p>ended</p>}
                dataLength={products.length}
              >
                <Products gridView={gridView} products={products}/>
              </InfiniteScroll>
            }
            {
              !isReachEnd &&
              <Row justify='center' classes='my-4'>
                <Loading classes='h-10 w-10'/>
              </Row>
            }
          </Box>
        </Grid>
      </Box>

      {/*Mobile - Tablet version*/}
      {!isLoading && <MobileTabletVersion total={total} products={products}/>}
    </>
  );
}

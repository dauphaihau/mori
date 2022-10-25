import React, { useEffect, useState } from 'react';

import { Box, Grid, Row, Text, Button } from 'core/components';
import { clns } from "core/helpers";
import { Filters, ProductListView, Sorter } from "./index";
import Product from 'components/common/Product';
import { useFilterContext } from "context/filterContext";
import { useRouter } from "next/router";
import { filterSearch } from "./Filters";

const Products = ({ products }) => {
  const { gridView } = useFilterContext()
  // const { gridView, filtered_products: products } = useFilterContext()
  const [endSlice, setEndSlice] = useState(9)
  const [isLoaded, setIsLoaded] = useState(false);
  const [page, setPage] = useState(1)
  const router = useRouter();

  useEffect(() => {
    if (Object.keys(router.query).length === 0) setPage(1)
  }, [router.query])

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    setEndSlice(9)
  }, [products]);

  const handleLoadMore = () => {
    setPage(page + 1)
    filterSearch({ router, page: page + 1 })
  }

  const ProductList = () => {
    if (gridView) {
      return (
        <Grid
          gap={4}
          sx={1}
          md={2}
          lg={3}
          classes={clns(isLoaded && 'fade-in-start')}
        >
          {
            products?.map((item, index) => (
              <Product
                dataFade={index}
                data={item}
                key={index}
              />
            ))
            // )).slice(0, endSlice)
          }
        </Grid>
      )
    }
    return (
      <Grid
        sx={1}
        classes={clns(isLoaded && 'fade-in-start')}
      >
        {
          products?.map((item, index) => (
            <ProductListView
              dataFade={index}
              data={item}
              key={index}
            />
          )).slice(0, endSlice)
        }
      </Grid>
    )
  }

  const ButtonLoadMore = () => {
    return <Row
      // hideIf={products.length < 9 || products.length < endSlice}
      justify='center'
      classes='mt-8'
    >
      <Button
        variant='gray'
        onClick={handleLoadMore}
        // onClick={() => setEndSlice(endSlice + 6)}
        text='Load more'
      />
    </Row>
  }

  return (
    <Grid
      sx={5}
      classes='min-h-full'
    >
      <Filters
        // quantityProd={products.length}
        // launchSticky={true}
      />
      <Box classes='w-full col-span-4'>
        <Row
          justify='between'
          classes='mb-6'
        >
          <Text
            h1
            classes='text-3xl laptop:text-xl font-light'
          >{products.length} results found</Text>
          <Sorter/>
        </Row>
        {
          products.length < 1
            ? <Text>Sorry, no products matched your search...</Text>
            : <>
              {ProductList()}
              {/*<ProductList/>*/}
              <ButtonLoadMore/>
            </>
        }
      </Box>
    </Grid>

  );
}

export default Products;

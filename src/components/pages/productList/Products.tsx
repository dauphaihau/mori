import React, { useCallback, useEffect, useRef, useState } from 'react';

import { Box, Grid, Row, Text, Button } from 'core/components';
import { clns } from "core/helpers";
import { ProductListView } from "./index";
import Product from 'components/common/Product';
import { useFilterContext } from "context/filterContext";
import { useRouter } from "next/router";
import { filterSearch } from "./Filters";
import useIntersectionObserver from 'core/hooks/useIntersectionObserver';

const Products = ({ data }) => {
  const { gridView } = useFilterContext()
  // const { gridView, filtered_products: products } = useFilterContext()
  const [isLoaded, setIsLoaded] = useState(false);
  const [page, setPage] = useState(1)
  const router = useRouter();
  const [pageNum, setPageNum] = useState(1);

  const { products, total } = data

  const [pageNumber, setPageNumber] = useState(0);
  const loadingRef = useRef(null);
  const listInnerRef = useRef(null);
  const ref = useRef<HTMLDivElement | null>(null)
  const entry = useIntersectionObserver(ref, {})

  useEffect(() => {
    if (Object.keys(router.query).length === 0) setPage(1)
  }, [router.query])

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 300);
  }, [products]);

  useEffect(() => {
    const el = document.querySelector(".myElement")

    const observer = new IntersectionObserver(
      ([e]) => {
        console.log('dauphaihau debug: e-intersection-ratio', e.intersectionRatio)
        e.target.classList.toggle("is-pinned", e.intersectionRatio < 1)
      },
      { threshold: [1] }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

  }, [ref.current])

  // observing dom node
  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       if (entries[0].isIntersecting) {
  //         setPage((page) => page + 1)
  //         filterSearch({ router, page: page + 1 })
  //         // handleLoadMore()
  //       }
  //     },
  //     { threshold: 0.5 }
  //   );
  //   if (loadingRef.current) observer.observe(loadingRef.current);
  //
  //   return () => {
  //     if (observer.current) {
  //       observer.unobserve(observer.current);
  //     }
  //   };
  // }, [loadingRef]);

  // const observer = useRef();
  // const lastBookElementRef = useCallback(
  //   (node) => {
  //   console.log('dauphaihau debug: runnn')
  //     if (!data) return;
  //     // if (isLoading) return;
  //     if (observer.current) observer.current.disconnect();
  //     observer.current = new IntersectionObserver((entries) => {
  //       if (entries[0].isIntersecting) {
  //         console.log('dauphaihau debug: runnn')
  //       // if (entries[0].isIntersecting && hasMore) {
  //       //   setPageNum((prev) => prev + 1);
  //         handleLoadMore()
  //       }
  //     });
  //     if (node) observer.current.observe(node);
  //   },
  //   [data ]
  //   // [data, hasMore]
  // );

  const handleScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        // ui.paramsRequestNotify = { ...ui.paramsRequestNotify, limit: ui.paramsRequestNotify.limit + 4 }
        // ui.actionRequest.current = ui.actionRequest.list
        // timeout.setTimeout()
        handleLoadMore()
      }
    }
  }

  const handleLoadMore = () => {
    setPage((page) => page + 1)
    console.log('dauphaihau debug: page', page)
    // setPage(page + 1)
    filterSearch({ router, page: page + 1 })
  }

  const ProductList = () => {
    if (gridView) {
      return (
        <>
          <Grid
            gap={4}
            sx={1}
            md={2}
            lg={3}
            classes={clns(isLoaded && 'fade-in-start', 'product-list')}
          >
            {
              products?.map((item, index) => (
                <Product
                  dataFade={index}
                  data={item}
                  key={index}
                />
              ))
            }
          </Grid>

          {/*<Box*/}
          {/*  hideIf={products.length < 12}*/}
          {/*  ref={loadingRef}*/}
          {/*>*/}
          {/*  <h3>Loading....</h3>*/}
          {/*</Box>*/}

        </>
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
          ))
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
        text='Load more'
      />
    </Row>
  }

  // const isVisible = entry?.intersectionRatio < 1
  // console.log('dauphaihau debug: is-visible', isVisible)

  if (products && products.length === 0) {
    return <Text>Sorry, no products matched your search...</Text>
  }

  return (
    <>
      {
        products && products.length < 1
          ? 'loading'
          // ? <Text>Sorry, no products matched your search...</Text>
          : <>
            {ProductList()}
            {/*<ProductList/>*/}
            <ButtonLoadMore/>
          </>
      }
    </>
  );
}

export default Products;

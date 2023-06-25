import React, { useEffect, useState } from 'react';

import { Grid, Text } from 'core/components';
import { ProductListView } from "./index";
import Product from 'components/common/Product';

export default function Products({ products, gridView }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 300);
  }, [products]);

  if (products.length === 0) {
    return <Text>Sorry, no products matched your search...</Text>
  }

  if (gridView) {
    return (
      <Grid
        classes={[isLoaded && 'fade-in-start', 'product-list']}
        gap={4} sx={1} md={2} lg={3}
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
    )
  }

  return (
    <Grid
      sx={1}
      classes={[isLoaded && 'fade-in-start']}
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

import { Box, Button, Grid, Text } from "core/components";
import { Sorter } from "./index";
import Product from 'components/common/Product';
import React, { useState } from "react";
import { FilterDrawer } from "../../drawer";

const MobileTabletVersion = ({ data }) => {
  const [showFiltersDrawer, setShowFiltersDrawer] = useState(false)
  const products = data?.products ? data.products : []
  // const products = data?.products ? [].concat(...data.products) : []

  return (
    <>
      <FilterDrawer
        showFiltersDrawer={showFiltersDrawer}
        setShowFiltersDrawer={setShowFiltersDrawer}
      />
      <Box classes='laptop:hidden layout pt-12'>
        <Box classes='mb-4 flex justify-between gap-x-8'>
          <Button
            classes='py-[7px] w-fit bg-white text-black border-[1px] border-[#d2d5da]'
            onClick={() => setShowFiltersDrawer(true)}
          >
            <i className='fa-solid fa-sliders mr-2'/>
            Filter</Button>
          <Sorter/>
        </Box>
        {products.length === 0 && <Text>Sorry, no products matched your search...</Text>}
        {
          products.length < 1
            ? <Text classes='mt-12'>Loading...</Text>
            : <Grid sx={2} md={2} gap={4}>
              {
                products?.map((item, index) => (
                  <Product data={item} key={index}/>
                ))
              }
            </Grid>
        }
      </Box>
    </>
  );
}

export default MobileTabletVersion

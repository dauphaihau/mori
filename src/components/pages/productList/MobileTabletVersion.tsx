import { Box, Button, Grid, Row, Text } from "core/components";
import { Sorter } from "./index";
import Product from 'components/common/Product';
import React, { useState } from "react";
import { FilterDrawer } from "components/drawer";

const MobileTabletVersion = ({ products, total }) => {
  const [showFiltersDrawer, setShowFiltersDrawer] = useState(false)

  return (
    <>
      <FilterDrawer
        showFiltersDrawer={showFiltersDrawer}
        setShowFiltersDrawer={setShowFiltersDrawer}
      />
      <Box classes='laptop:hidden layout pt-12'>
        <Row
          justify='between'
          align='center'
          classes='mb-4 gap-x-8'
        >
          <Text classes='text-primary-gray'>
            {total} results
          </Text>
          <Row>
            <Button
              classes='py-[7px] w-fit bg-white text-black border-[1px] border-[#d2d5da]'
              onClick={() => setShowFiltersDrawer(true)}
            >
              <i className='fa-solid fa-sliders mr-2'/>
              Filter</Button>
            <Sorter/>
          </Row>
        </Row>
        {products.length === 0 && <Text>Sorry, no products matched your search...</Text>}
        {
          products.length < 1
            ? <Text classes='mt-12'>Loading...</Text>
            : <Grid sx={2} md={2} gap={4}>
              {
                products.map((item, index) => (
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

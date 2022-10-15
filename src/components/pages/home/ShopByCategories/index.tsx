import React from 'react';
import { Box, Grid, Link, NextImage, Text } from 'core/components';
import { titleIfy } from "core/helpers";
import { useFilterContext } from "context/filterContext";
import FadeInSection from 'components/common/FadeInSection';
import Enums from "config/enums";

const ShopByCategories = ({ categoriesData = [] }) => {
  const { updateFilters } = useFilterContext()

  const handleUpdateFilters = (value) => {
    updateFilters({ target: { name: 'category', value } })
  }

  return (
    <FadeInSection classes='my-20 layout laptop:w-9/12 text-center'>
      <Text h2 classes='mb-8'>Shop By Categories</Text>
      <Grid sx={1} md={2} lg={3} gap={4}>
        {
          categoriesData.map((category, index) => (
            <Box classes='mb-4 laptop:mb-0 bg-product p-6 relative' key={index}>
              <Link
                onClick={() => handleUpdateFilters(category.name.charAt(0) + category.name.slice(1))}
                href={Enums.PATH.PRODUCT._}
              >
                <NextImage
                  alt={titleIfy(category.name)}
                  width={200}
                  height={220}
                  src={category.image}
                  className='mx-auto'
                  objectFit='contain'
                  // imgClassName='w-3/5'
                />
                <Box classes='text-left mt-4'>
                  <Text
                    weight='semibold'
                    classes='text-xl mb-1'
                    text={titleIfy(category.name)}
                  />
                  <Text classes='text-xs text-primary-gray'>{category.itemCount} items</Text>
                </Box>
              </Link>
            </Box>
          )).slice(0, 6)
        }
      </Grid>
    </FadeInSection>
  );
}

export default ShopByCategories;

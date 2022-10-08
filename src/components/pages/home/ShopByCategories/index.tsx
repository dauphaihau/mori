import React from 'react';

import { Box, Grid, Text } from 'core/components';
import CategoryCard from "../../categories/CategoryCard";
import { titleIfy } from "core/helpers";
import { useFilterContext } from "context/filterContext";

const ShopByCategories = ({ categoriesData = [] }) => {
  const { updateFilters } = useFilterContext()

  const handleUpdateFilters = (name, value) => {
    updateFilters({ target: { name, value } })
  }

  return (
    <>
      <Box classes='my-20 layout laptop:w-9/12 text-center'>
        <Text h2 classes='mb-8'>Shop By Categories</Text>
        <Grid sx={1} md={2} lg={3} gap={4}>
          {
            categoriesData.map((category, index) => (
              <CategoryCard
                onClick={() => handleUpdateFilters('category', category.name.charAt(0) + category.name.slice(1))}
                key={index}
                imageSrc={category.image}
                count={`${category.itemCount} items`}
                title={titleIfy(category.name)}
              />
            )).slice(0, 6)
          }
        </Grid>
      </Box>
    </>
  );
}

export default ShopByCategories;

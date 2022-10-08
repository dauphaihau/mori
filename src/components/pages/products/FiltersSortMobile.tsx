import { Box, Button, Grid, Text } from "core/components";
import { Sorter } from "./index";
import Product from 'components/common/Product';
import { useFilterContext } from 'context/filterContext';

const FiltersSortMobile = ({setShowFiltersDrawer, endSlice = 9}) => {

  const { filtered_products: products } = useFilterContext()
    return (
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
        {
          products.length < 1
            ? <Text classes='mt-12'>Sorry, no products matched your search...</Text>
            : <Grid sx={2} md={2} gap={4}>
              {
                products?.map((item, index) => (
                  <Product
                    data={item}
                    key={index}
                  />
                )).slice(0, endSlice)
              }
            </Grid>
        }
      </Box>
    );
}

export default FiltersSortMobile;

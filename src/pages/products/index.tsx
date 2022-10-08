import { useEffect, useState } from 'react';
import { useUIController } from 'context/UIControllerContext';
import { Box, Breadcrumb } from 'core/components';
import { FilterDrawer } from 'components/drawer';
import Seo from 'components/common/Seo';
import inventoryCategories from "assets/data/InventoryData/inventoryCategories";
import Enums from "config/enums";
import FiltersSortMobile from "../../components/pages/products/FiltersSortMobile";
import FiltersSorter from "../../components/pages/products/FiltersSorterProducts";

const dataBreadcrumb = [
  { path: Enums.PATH.DEFAULT, name: 'Home' },
  { path: Enums.PATH.PRODUCT._, name: 'Products' },
];

const ProductsPage = ({ categories = [] }) => {
  const [showFiltersDrawer, setShowFiltersDrawer] = useState(false)
  const { setCategories } = useUIController();

  useEffect(() => {
    setCategories(categories)
  }, [])

  return (
    <>
      <Seo description='Coffin ECommerce - All categories'/>

      <FilterDrawer
        showFiltersDrawer={showFiltersDrawer}
        setShowFiltersDrawer={setShowFiltersDrawer}
      />
      <Box classes='hidden laptop:block layout pt-16'>
        <Breadcrumb classes='mb-6' data={dataBreadcrumb}/>
        <FiltersSorter categories={categories}/>
      </Box>

      {/*Mobile - Tablet version*/}
      <FiltersSortMobile setShowFiltersDrawer={setShowFiltersDrawer}/>
    </>
  );
}

export async function getStaticProps() {
  const categoriesData = await inventoryCategories()
  return {
    props: {
      categories: categoriesData
    }
  }
}

export default ProductsPage;

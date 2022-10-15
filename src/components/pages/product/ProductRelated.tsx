import { Text, Grid, Box } from 'core/components';
import Product from '../../common/Product';
import {  useEffect, useState } from "react";
import inventoryForCategory from "assets/data/InventoryData/inventoryForCategory";
import { useRouter } from "next/router";

const RelatedProduct = ({ product }) => {
  const router = useRouter();
  const [relatedProducts, setRelatedProducts] = useState([])

  useEffect(() => {
    const loadInit = async () => {
      const res = await inventoryForCategory(product.categories[0]);
      setRelatedProducts(res);
      // setQuantityItem(1);
    }
    loadInit()
  }, [router.asPath])

  return (
    <div className={`  flex flex-col laptop:flex-row gap-x-8 desktop:w-10/12 mx-auto `}>
      <Box classes='mt-20 mb-10'>
        <Text
          weight='bold'
          classes='text-lg tablet:text-2xl mb-4'
        >You may also like</Text>
        <Grid gap={4} sx={1} md={2} lg={4}>
          {
            relatedProducts?.filter(p => p.id !== product.id).map((item, index) => {
              return (
                <Product
                  data={item}
                  key={index}
                />
              )
            }).slice(0, 4)
          }
        </Grid>
      </Box>
    </div>
  )
}

export default RelatedProduct

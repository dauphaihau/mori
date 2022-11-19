import { Box, Grid, Row, Text } from 'core/components';
import { ProductCard } from '../index';
import CountdownTimer from '../CountdownTimer';
import BigProductCard from './BigProductCard';
import FadeInSection from 'components/common/FadeInSection';
import { productService, useProductsSale } from "../../../../services/product";
import { useEffect } from "react";

const data = [
  'Autumn Oak Hardwood',
  'Clarksburg Wooden Casket',
]

const FlashSaleProducts = ({ inventoryData }) => {

  // const { products } = useProductsSale(data)
  const { products } = useProductsSale(data)

  // useEffect(() => {
  //   async function initialLoad() {
  //     // const products = await productService.getProductSale(data)
  //     const products = await useProductsSale(data)
  //     console.log('dauphaihau debug: products', products)
  //   }
  //
  //   initialLoad()
  // }, [])

  return (
    <FadeInSection classes='my-12 mb-24 layout'>
      <Row
        justify='between'
        align='center'
        classes='mb-4'
      >
        <Text h2>Flash Sale</Text>
        <CountdownTimer/>
      </Row>
      <Grid
        sx={1}
        lg={2}
        gap={8}
        classes=''
      >
        <Box classes='hidden laptop:block'>
          <BigProductCard data={inventoryData[26]}/>
        </Box>
        <Grid gap={4}>
          <Grid
            md={2}
            gap={8}
          >
            <ProductCard data={inventoryData[12]}/>
            <ProductCard data={inventoryData[25]}/>
          </Grid>
          <Grid
            md={2}
            gap={8}
            classes='mt-4'
          >
            <ProductCard data={inventoryData[26]}/>
            <ProductCard data={inventoryData[28]}/>
          </Grid>
        </Grid>
      </Grid>
    </FadeInSection>
  )
}

export default FlashSaleProducts;

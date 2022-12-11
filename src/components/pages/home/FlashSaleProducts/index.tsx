import { Box, Grid, Row, Text } from 'core/components';
import CountdownTimer from '../CountdownTimer';
import FadeInSection from 'components/common/FadeInSection';
import {  useProductsSale } from "services/product";
import BigProductFlashSaleCard from './BigProductFlashSaleCard';
import ProductFlashSaleCard from "./ProductFlashSaleCard";

export default function FlashSaleProducts () {
  const { products } = useProductsSale()
  // console.log('dauphaihau debug: products', products)

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
      <Grid sx={1} lg={2} gap={8}>
        <Box classes='hidden laptop:block'>
          <BigProductFlashSaleCard data={products && products[2]}/>
        </Box>
        <Grid gap={4}>
          <Grid md={2} gap={8}>
            <ProductFlashSaleCard data={products && products[1]}/>
            <ProductFlashSaleCard data={products && products[2]}/>
          </Grid>
          <Grid
            md={2}
            gap={8}
            classes='mt-4'
          >
            <ProductFlashSaleCard data={products && products[3]}/>
            <ProductFlashSaleCard data={products && products[4]}/>
          </Grid>
        </Grid>
      </Grid>
    </FadeInSection>
  )
}

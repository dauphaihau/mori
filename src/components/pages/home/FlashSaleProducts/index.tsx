import { Box, Grid, Row, Text } from 'core/components';
import { ProductCard } from '../index';
import CountdownTimer from '../CountdownTimer';
import BigProductCard from './BigProductCard';

const FlashSaleProducts = ({ inventoryData }) => {
  return (
    <Box section classes='my-12 mb-24 layout'>
      <Row justify='between' align='center' classes='mb-4'>
        <Text h1 classes='text-lg tablet:text-3xl'>Flash Sale</Text>
        <CountdownTimer/>
      </Row>
      <Grid sx={1} lg={2} gap={8} classes=''>
        <Box classes='hidden laptop:block'>
          <BigProductCard data={inventoryData[26]}/>
        </Box>
        <Grid gap={4}>
          <Grid md={2} gap={8}>
            <ProductCard data={inventoryData[12]}/>
            <ProductCard data={inventoryData[25]}/>
          </Grid>
          <Grid md={2} gap={8} classes='mt-4'>
            <ProductCard data={inventoryData[27]}/>
            <ProductCard data={inventoryData[29]}/>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default FlashSaleProducts;

import { Text, Grid, Box } from 'core/components';
import Product from 'components/common/Product';
import { useProductContext } from 'components/context/ProductContext';

export default function RelatedProduct() {
  const { relatedProducts } = useProductContext()
  if (!relatedProducts) return null

  return (
    <Box classes='flex flex-col laptop:flex-row gap-x-8 desktop:w-10/12 mx-auto'>
      <Box classes='mt-20 mb-10'>
        <Text h3 classes='mb-4'>You may also like</Text>
        <Grid gap={4} sx={1} md={2} lg={4}>
          {relatedProducts?.map((item, index) => (
            <Product data={item} key={index}/>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}

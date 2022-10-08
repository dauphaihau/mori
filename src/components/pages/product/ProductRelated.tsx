import { Text, Col, Grid, Box } from 'core/components';
import Product from '../../common/Product';
import { slugify } from 'core/helpers';
import { ProductType } from 'types/product';

interface RelatedProductProps {
  relatedProducts: ProductType[]
  currentProduct: ProductType
}

const RelatedProduct = (props: RelatedProductProps) => {
  const { relatedProducts, currentProduct } = props;

  return (
    <Box classes='mt-20 mb-10'>
      <Text
        weight='bold'
        classes='text-lg tablet:text-2xl mb-4'
      >You may also like</Text>
      <Grid gap={4} sx={1} md={2} lg={4}>
        {
          relatedProducts?.filter(p => p.id !== currentProduct.id).map((item, index) => {
            return (
              <Product data={item} key={index}/>
            )
          }).slice(0, 4)
        }
      </Grid>
    </Box>
  )
}
export default RelatedProduct

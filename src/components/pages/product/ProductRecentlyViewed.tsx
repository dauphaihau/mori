import { Text, Col, Grid } from 'core/components';
import Product from '../../common/Product';
import { ProductType } from 'types/product';

interface RelatedProductProps {
  relatedProducts: ProductType[]
  currentProduct: ProductType
}

const ProductRecentlyViewed = (props: RelatedProductProps) => {
  const { allProduct, recentlyViewedProduct } = props;

  // console.log('dauphaihau debug: related-products', relatedProducts)
  // console.log('dauphaihau debug: current-product', currentProduct)

  return (
    <Col classes='my-10'>
      <Text
        weight='bold'
        classes='text-lg tablet:text-2xl ml-2 mb-4'
      >Recently Viewed</Text>
      <Grid gap={4} sx={1} md={2} lg={4}>
        {
          allProduct?.filter(p => recentlyViewedProduct.includes(p.id)).map((item, index) => {
            return (<Product data={item} key={index}/>)
          }).reverse().slice(1, 5)
        }
      </Grid>
    </Col>
  )
}
export default ProductRecentlyViewed

import { fetchInventory } from 'assets/data/InventoryData/provider/inventoryProvider';
import { slugify, titleIfy } from 'core/helpers';
import { ProductInfo, ProductRelated } from 'components/pages/product';
import { Box } from 'core/components';
import db from 'server/config/db';
import Product from 'server/models/Product';

const ProductPage = ({ product, imageProps }) => {
  return (
    <Box classes='mx-auto max-w-[120rem] w-full laptop:w-[95%] px-2 tablet:px-6 laptop:px-0 '>
      <ProductInfo product={product}/>

      {/*<CustomerReview/>*/}
      <ProductRelated product={product}/>
    </Box>
  )
}

export async function getStaticPaths() {
  const inventory = await fetchInventory()
  const paths = inventory.map(item => {
    return { params: { name: slugify(item.name) } }
  })
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const name = params.name.replace(/-/g, ' ')
  const inventory = await fetchInventory()
  const product = inventory.find(item => slugify(item.name) === slugify(name))

  return {
    props: {
      product,
    }
  }
}

// export async function getServerSideProps({ params }) {
//   const name = titleIfy(params.name)
//
//   await db.connect();
//   const product = await Product.findOne({ name }).lean();
//   await db.disconnect();
//
//   return {
//     props: {
//       product: product ? db.convertDocToObj(product) : null,
//     },
//   };
// }

export default ProductPage

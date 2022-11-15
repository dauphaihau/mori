import { fetchInventory } from 'assets/data/InventoryData/provider/inventoryProvider';
import { slugify, titleIfy } from 'core/helpers';
import { ProductInfo, ProductRelated } from 'components/pages/product';
import { Box } from 'core/components';
import db from 'server/config/db';
import Product from 'server/models/Product';

const ProductPage = ({ product, productByCategory, imageProps }) => {

  console.log('dauphaihau debug: product-by-category', productByCategory)
  return (
    <Box classes='mx-auto max-w-[120rem] w-full laptop:w-[95%] px-2 tablet:px-6 laptop:px-0 '>
      <ProductInfo product={product}/>
      <ProductRelated products={productByCategory}/>
    </Box>
  )
}

// export async function getStaticPaths() {
//   const inventory = await fetchInventory()
//   const paths = inventory.map(item => {
//     return { params: { name: slugify(item.name) } }
//   })
//   return {
//     paths,
//     fallback: false
//   }
// }
//
// export async function getStaticProps({ params }) {
//   const name = params.name.replace(/-/g, ' ')
//   const inventory = await fetchInventory()
//   const product = inventory.find(item => slugify(item.name) === slugify(name))
//
//   return {
//     props: {
//       product,
//     }
//   }
// }

export async function getServerSideProps({ params }) {
  const name = titleIfy(params.name)
  console.log('dauphaihau debug: name', name)

  // @ts-ignore
  const product = await Product.findOne({ name }).lean();
  console.log('dauphaihau debug: product', product)

  const productByCategory = await Product.find({ categories: product.categories[0] }).limit(4);
  console.log('dauphaihau debug: productByCategory', productByCategory)

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      productByCategory: JSON.parse(JSON.stringify(productByCategory))
    }
  };
}

export default ProductPage

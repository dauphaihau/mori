import { fetchInventory } from 'assets/data/InventoryData/provider/inventoryProvider';
import { slugify, titleIfy } from 'core/helpers';
import { ProductInfo, ProductRelated } from 'components/pages/product';
import { Box } from 'core/components';
import db from 'server/config/db';
import Product from 'server/models/Product';
import { useEffect, useState } from "react";
import { productService } from "../../services/product";
import { useRouter } from "next/router";

// const ProductPage = () => {
const ProductPage = ({ product, productByCategory, imageProps }) => {

  // const [product, setProduct] = useState(null)
  // const [productsRelated, setProductsRelated] = useState([])
  // const router = useRouter()

  // console.log('dauphaihau debug: product-by-category', productByCategory)

  // useEffect(() => {
  //   const initLoad = async () => {
  //
  //     const name = titleIfy(router.query.name)
  //     console.log('dauphaihau debug: name', name)
  //
  //     const res = await productService.getDetailProduct(name)
  //     console.log('dauphaihau debug: res', res)
  //     setProduct(res.product)
  //
  //     // const productByCategory = await Product.find({ categories: product.category }).limit(4);
  //     // console.log('dauphaihau debug: productByCategory', productByCategory)
  //   }
  //   initLoad()
  //
  // }, [])
  //
  return (
    <Box classes='mx-auto max-w-[120rem] w-full laptop:w-[95%] px-2 tablet:px-6 laptop:px-0 '>
      {
        product &&
      <ProductInfo product={product.product}/>
       }
      {/*<ProductRelated products={productsRelated}/>*/}
      {/*<ProductRelated products={productByCategory}/>*/}
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
  const product = await productService.getDetailProduct(name)
  // const product = await Product.findOne({ name }).lean();
  console.log('dauphaihau debug: product', product)

  // const productByCategory = await Product.find({ categories: product.categories[0] }).limit(4);
  // console.log('dauphaihau debug: productByCategory', productByCategory)

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      // productByCategory: JSON.parse(JSON.stringify(productByCategory))
    }
  };
}

export default ProductPage

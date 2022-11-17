import { cn, titleIfy } from 'core/helpers';
import { ProductInfo, ProductRelated } from 'components/pages/product';
import { Box } from 'core/components';
import { useDetailProduct, useRelatedProducts } from "../../services/product";
import { useRouter } from "next/router";
import { Loading } from "core/components";

const ProductPage = () => {
  const router = useRouter()
  const name = titleIfy(router.query.name)
  const { product, isError } = useDetailProduct(name)
  const { relatedProducts, isLoading } = useRelatedProducts(product?.category)

  console.log('dauphaihau debug: product', product)
  console.log('dauphaihau debug: related-products', relatedProducts)

  // if (!data) {
  //   return null
  // }

  return (
    <Box
      classes={cn('mx-auto max-w-[120rem] w-full laptop:w-[95%] px-2 tablet:px-6 laptop:px-0 min-h-screen',
        !relatedProducts && 'grid place-items-center'
      )}
    >
      {
        relatedProducts && relatedProducts.length ? <>
            <ProductInfo product={product}/>
            <ProductRelated products={relatedProducts}/>

            {/*<Loading className={'w-[60px] h-[60px]'}/>*/}
          </>
          : <Loading className={'w-[60px] h-[60px]'}/>
      }
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

// export async function getServerSideProps({ params }) {
//   const name = titleIfy(params.name)
//   console.log('dauphaihau debug: name', name)
//
//   // @ts-ignore
//   const product = await productService.getDetailProduct(name)
//   // const product = await Product.findOne({ name }).lean();
//   console.log('dauphaihau debug: product', product)
//
//   // const productByCategory = await Product.find({ categories: product.categories[0] }).limit(4);
//   // console.log('dauphaihau debug: productByCategory', productByCategory)
//
//   return {
//     props: {
//       product: JSON.parse(JSON.stringify(product)),
//       // productByCategory: JSON.parse(JSON.stringify(productByCategory))
//     }
//   };
// }

export default ProductPage

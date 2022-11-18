import { cn, titleIfy } from 'core/helpers';
import { ProductInfo, ProductRelated } from 'components/pages/product';
import { Box } from 'core/components';
import { useDetailProduct, useRelatedProducts } from "../../services/product";
import { useRouter } from "next/router";
import { Loading } from "core/components";

export default function ProductPage() {
  const router = useRouter()
  const name = titleIfy(router.query.name)
  const { product, isError, isLoading } = useDetailProduct(name)
  const { relatedProducts } = useRelatedProducts(product?.category)

  // console.log('dauphaihau debug: product', product)
  // console.log('dauphaihau debug: related-products', relatedProducts)

  // if (!data) {
  //   return null
  // }

  return (
    <Box
      classes={cn('mx-auto max-w-[120rem] w-full laptop:w-[95%] px-2 tablet:px-6 laptop:px-0 min-h-screen',
        !relatedProducts && 'grid place-items-center'
      )}
    >
      {isLoading ? <Loading className={'w-[60px] h-[60px]'}/> : <ProductInfo product={product}/>}
      {relatedProducts && relatedProducts.length ? <ProductRelated products={relatedProducts}/> : null}
    </Box>
  )
}

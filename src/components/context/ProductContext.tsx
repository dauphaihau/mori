import { createContext, FC, useContext } from "react";
import { useRouter } from "next/router";

import { useDetailProduct, useRelatedProducts } from "services/product";
import { titleIfy } from 'core/helpers';
import { IProduct } from "types/product";
import { Box } from "core/components";
import NotFound from "components/common/NotFound";

export interface ProductContextProps {
  isLoading: boolean
  product: IProduct
  relatedProducts: IProduct[]
}

export const ProductContext = createContext<ProductContextProps>(undefined)

export function useProductContext() {
  return useContext(ProductContext);
}

export const ProductProvider: FC = ({ children }) => {
  const router = useRouter()
  const name = titleIfy(router.query?.name as string)
  const { product, isLoading, mutate } = useDetailProduct(name)
  const { relatedProducts } = useRelatedProducts({
    category: product?.category,
    name
  })

  const providerValues: ProductContextProps = {
    isLoading,
    product,
    relatedProducts,
  };

  if (!isLoading && !product) return <NotFound/>

  return (
    <ProductContext.Provider value={providerValues}>
      <Box
        classes={[
          'mx-auto max-w-[120rem] w-full laptop:w-[95%] px-2 tablet:px-6 laptop:px-0 min-h-screen',
          !relatedProducts && 'grid place-items-center'
        ]}
      >
        {!isLoading && children}
      </Box>
    </ProductContext.Provider>
  );
}

import { FC } from "react";
import { useRouter } from "next/router";

import { useSafeContext } from "core/hooks";
import { useDetailProduct, useRelatedProducts } from "services/product";
import { titleIfy } from 'core/helpers';
import { IProduct } from "types/product";
import { Box } from "core/components";

export interface ProductContextProps {
  isLoading: boolean
  product: IProduct
  relatedProducts: IProduct[]
}

export const [useProductContext, Provider] = useSafeContext<ProductContextProps>({})

export const ProductProvider: FC = ({ children }) => {
  const router = useRouter()
  const name = titleIfy(router.query?.name as string)
  const { product, isLoading } = useDetailProduct(name)
  const { relatedProducts } = useRelatedProducts({
    category: product?.category,
    name
  })

  const providerValues: ProductContextProps = {
    isLoading,
    product,
    relatedProducts
  };

  return (
    <Provider value={providerValues}>
      <Box
        classes={['mx-auto max-w-[120rem] w-full laptop:w-[95%] px-2 tablet:px-6 laptop:px-0 min-h-screen',
          !relatedProducts && 'grid place-items-center'
        ]}
      >
        {!isLoading && children}
      </Box>
    </Provider>
  );
}

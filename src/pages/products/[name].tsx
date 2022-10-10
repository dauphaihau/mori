import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router';

import inventoryForCategory from 'assets/data/InventoryData/inventoryForCategory';
import { useAuth } from 'context/authContext';
import { fetchInventory } from 'assets/data/InventoryData/provider/inventoryProvider';
import { slugify } from 'core/helpers';
import { CartProvider, CartContext } from 'context/cartContext';
import { CustomerReview, ProductFaq, ProductInfo, ProductRelated } from 'components/pages/product';
import { useLocalStorage } from "../../core/hooks/useLocalStorage";
import { STORAGE_KEY } from "../../config/enums";
import { Box } from 'core/components';
import { quantityProductOpts } from "../../assets/data/options";

const ProductPage = ({ product, context, imageProps }) => {
  const router = useRouter();
  const [relatedProducts, setRelatedProducts] = useState()
  const [quantityItem, setQuantityItem] = useState(1)
  const [disableAddItem, setDisableAddItem] = useState(false)
  const { addToCart, numberAllOfItemsInCart, setItemQuantity, cart } = context
  const { user, setUser } = useAuth();

  useEffect(() => {
    const loadInit = async () => {
      const res = await inventoryForCategory(product.categories[0]);
      setRelatedProducts(res);
      setQuantityItem(1);
    }
    loadInit()
  }, [router.asPath])

  useEffect(() => {
    setUser({ ...user, numberAllOfItemsInCart })
    // handleValidQuantity()
  }, [numberAllOfItemsInCart])

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     const storageState = window.localStorage.getItem(STORAGE_KEY)
  //     if (storageState) {
  //       const state = JSON.parse(storageState)
  //       console.log('dauphaihau debug: state', state)
  //     }
  //   }
  //   console.log('dauphaihau debug: cart', cart)
  // },[cart])
  //

  const handleValidCheckInCart = (valueSelected) => {
    try {
      if (cart.length) {
        const productInCart = cart.find(o => product.id === o.id)
        console.log('dauphaihau debug: product-in-cart', productInCart)
        if (productInCart) {
          const resQuantityProd = product.quantity - productInCart.quantity
          return resQuantityProd >= valueSelected
        }
        return false
      }
      console.log('dauphaihau debug: empty-cart')
      return true

    } catch (error) {
      console.log('dauphaihau debug: error', error)
    }
  }

  const handleSelectQuantityItem = (quantitySelected) => {
    console.log('dauphaihau debug: quantity-val', quantitySelected)

    const status1 = product.quantity >= quantitySelected
    const status2 = handleValidCheckInCart(quantitySelected)

    if (status1 && status2) {
      setQuantityItem(quantitySelected)
      setDisableAddItem(false)
    } else {
      setDisableAddItem(true)
    }
  }

  const addItemToCart = (product) => {
    addToCart({ ...product, quantity: quantityItem });
  }

  return (
    <Box classes='mx-auto max-w-[120rem] w-full laptop:w-[95%] px-2 tablet:px-6 laptop:px-0 '>
      <ProductInfo
        // imageProps={imageProps}
        product={product}
        quantityItem={quantityItem}
        addItemToCart={addItemToCart}
        setQuantityItem={setQuantityItem}
        handleSelectQuantityItem={handleSelectQuantityItem}
        disableAddItem={disableAddItem}
      />
      {/*<CustomerReview/>*/}

      <Box classes='flex flex-col laptop:flex-row gap-x-8 desktop:w-10/12 mx-auto'>
        <ProductRelated
          relatedProducts={relatedProducts}
          currentProduct={product}
        />
      </Box>
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

function ProductWithContext(props) {
  return (
    <CartProvider>
      <CartContext.Consumer>
        {context => <ProductPage {...props} context={context}/>}
      </CartContext.Consumer>
    </CartProvider>
  )
}

export default ProductWithContext

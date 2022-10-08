import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router';

import inventoryForCategory from 'assets/data/InventoryData/inventoryForCategory';
import { useAuth } from 'context/authContext';
import { fetchInventory } from 'assets/data/InventoryData/provider/inventoryProvider';
import { slugify } from 'core/helpers';
import { CartProvider, CartContext } from 'context/cartContext';
import { CustomerReview, ProductFaq, ProductInfo, ProductRelated } from 'components/pages/product';
import { Box } from 'core/components';

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

  /*
  1. initial load page -> check
  2. onSelect -> check
  3. after add -> check
   */

  const handleValidCheckInCart = (value) => {
    try {
      console.log('dauphaihau debug: product-quantity', product.quantity)
      console.log('dauphaihau debug: quantity-item', value)
      const productInCart = cart.find(o => product.id === o.id)
      if (productInCart) {
        if (productInCart.quantity <= value) {
          console.log('dauphaihau debug: run case 2')
          return false
        }
        return true
      }
      return true
    } catch (error) {
      console.log('dauphaihau debug: error', error)
    }
  }

  const handleValidQuantity = (value) => {
    try {
      // console.log('dauphaihau debug: product-quantity', product.quantity)
      // console.log('dauphaihau debug: value', value)

      if (product.quantity < value) {
        // console.log('dauphaihau debug: run case 1')
        return false
      }

      // const productInCart = cart.find(o => product.id === o.id)
      // if (productInCart) {
      //   if (productInCart.quantity < value) {
      //     console.log('dauphaihau debug: run case 2')
      //     return false
      //   }
      // }

      return true
    } catch (error) {
      console.log('dauphaihau debug: error', error)
    }
  }

  const handleSelectQuantityItem = (quantityVal) => {

    const status1 = handleValidQuantity(quantityVal)
    // const status2 = handleValidQuantity(quantityVal)
    const status2 = handleValidCheckInCart(quantityVal)
    // console.log('dauphaihau debug: status', status)
    // console.log('dauphaihau debug: status-2', status2)

    if (status1) {
      // if (!status1 && !status2) {
      setQuantityItem(quantityVal)
    }
    setDisableAddItem(!status1)
    // setDisableAddItem(!status1 && !status2)

    // const status2 = handleValidCheckInCart()
    // setDisableAddItem(status2)
  }

  const addItemToCart = (product) => {
    addToCart({ ...product, quantity: quantityItem });
    // const status = handleValidCheckInCart(quantityItem)
    // setDisableAddItem(!status)
  }

  return (
    <Box classes='layout'>
      <ProductInfo
        imageProps={imageProps}
        product={product}
        quantityItem={quantityItem}
        addItemToCart={addItemToCart}
        setQuantityItem={setQuantityItem}
        handleSelectQuantityItem={handleSelectQuantityItem}
        disableAddItem={disableAddItem}
      />
      <ProductFaq/>
      <CustomerReview/>

      <ProductRelated
        relatedProducts={relatedProducts}
        currentProduct={product}
      />
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

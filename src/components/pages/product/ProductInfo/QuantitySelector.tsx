import React, { useEffect, useState } from "react";

import { Button, Row } from "core/components";
import QuantitySelect from "./QuantitySelect";
import { CartContext, CartProvider } from "components/context/cartContext";
import { useAuth } from "components/context/authContext";
import { CartDrawer } from "components/drawer";
import { STORAGE_KEY } from "config/const";
import { useProductContext } from "components/context/ProductContext";

function QuantitySelector({ context }) {
  const { product } = useProductContext()
  const { addToCart, numberAllOfItemsInCart, setItemQuantity, cart } = context
  const [quantityItem, setQuantityItem] = useState(1)
  const [disableAddItem, setDisableAddItem] = useState(false)
  const [showCartDrawer, setShowCartDrawer] = useState(false)
  // const { user, setUser } = useAuth();

  // useEffect(() => {
  //   setUser({ ...user, numberAllOfItemsInCart })
  //   // handleValidQuantity()
  // }, [numberAllOfItemsInCart])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storageState = window.localStorage.getItem(STORAGE_KEY)
      if (storageState) {
        const state = JSON.parse(storageState)
        // console.log('dauphaihau debug: state', state)
      }
    }
  }, [showCartDrawer])

  const stockQuantity = product.quantity

  const handleValidCheckInCart = (quantitySelected) => {
    try {
      if (cart.length) {
        const productInCart = cart.find(o => product.id === o._id)
        // console.log('dauphaihau debug: product-in-cart', productInCart.quantity)
        if (!productInCart) {
          return true
        }

        if (productInCart) {
          const resQuantityProd = stockQuantity - productInCart.quantity
          return resQuantityProd >= quantitySelected
        }
        return false
      }
      // console.log('dauphaihau debug: empty-cart')
      return true

    } catch (error) {
      // console.log('dauphaihau debug: error', error)
    }
  }

  const handleSelectQuantityItem = (quantitySelected) => {
    const status1 = stockQuantity >= quantitySelected
    const status2 = handleValidCheckInCart(quantitySelected)

    if (status1 && status2) {
      setQuantityItem(quantitySelected)
      setDisableAddItem(false)
    } else {
      setDisableAddItem(true)
    }
  }

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

  const addItemToCart = () => {
    setShowCartDrawer(true)
    addToCart({ ...product, max_quantity: product.quantity,  quantity: quantityItem });
  }

  return (
    <>
      <CartDrawer
        showCartDrawer={showCartDrawer}
        setShowCartDrawer={setShowCartDrawer}
      />
      <Row
        align='center'
        gap={4}
        classes='mb-5'
      >
        <QuantitySelect onSelect={handleSelectQuantityItem}/>
        <Button
          size='md'
          width='full'
          onClick={addItemToCart}
          data-testid='addToCartButton'
          disabled={disableAddItem || stockQuantity === 0}
          // disabled={quantityItem === product.quantity}
          // disabled={stockQuantity === 0}
          text={stockQuantity === 0 ? 'Sold out' : 'Add to Cart'}
        />
      </Row>
    </>
  );
}

function QuantitySelectorWithContext(props) {
  return (
    <CartProvider>
      <CartContext.Consumer>
        {context => <QuantitySelector {...props} context={context}/>}
      </CartContext.Consumer>
    </CartProvider>
  )
}

export default QuantitySelectorWithContext

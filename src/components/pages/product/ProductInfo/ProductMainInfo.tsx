import React, { useEffect, useState } from 'react';
import { Box, Button, Col, NextImage, Row, Text } from "core/components";
import { formatDollarUS } from "core/helpers";
import RatingStars from "./RatingStars";
import { CartContext, CartProvider } from "context/cartContext";
import { useAuth } from "context/authContext";
import { CartDrawer } from "../../../drawer";
import { STORAGE_KEY } from "config/enums";
import QuantitySelect from "./QuantitySelect";
import moment from "moment";

const ProductMainInfo = ({ product, context }) => {
  const { name, salePrice, price } = product;
  const { addToCart, numberAllOfItemsInCart, setItemQuantity, cart } = context
  const [showCartDrawer, setShowCartDrawer] = useState(false)
  const [quantityItem, setQuantityItem] = useState(1)
  const [disableAddItem, setDisableAddItem] = useState(false)
  const { user, setUser } = useAuth();

  useEffect(() => {
    setUser({ ...user, numberAllOfItemsInCart })
    // handleValidQuantity()
  }, [numberAllOfItemsInCart])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storageState = window.localStorage.getItem(STORAGE_KEY)
      if (storageState) {
        const state = JSON.parse(storageState)
        console.log('dauphaihau debug: state', state)
      }
    }
  }, [showCartDrawer])

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
    addToCart({ ...product, quantity: quantityItem });
  }

  return (
    <Box>
      <CartDrawer
        showCartDrawer={showCartDrawer}
        setShowCartDrawer={setShowCartDrawer}
      />
      <Text
        h1
        weight='light'
        // weight='light'
        classes='text-xl tablet:text-2xl laptop:text-4xl mt-2 mb-5'
        text={name}
      />
      <Row
        align='center'
        classes='mb-5'
      >
        <RatingStars initialValue={product.rating}/>
        <Text
          // weight='medium'
          classes='mt-2 ml-4 mt-0'
          text='11 reviews'
        />
      </Row>
      <Text
        weight='bold'
        classes='text-2xl tablet:text-3xl laptop:text-[22px] relative tracking-wide  mb-5'
      >
        {salePrice ? formatDollarUS(salePrice) : formatDollarUS(price)}
        <Text
          hideIf={!price || !salePrice}
          span
          weight='light'
          classes='text-[18px] absolute top-[-1%] tablet:top-[-2px] ml-[10px] line-through'
        >
          {formatDollarUS(price)}
        </Text>
      </Text>

      <Text classes='mb-5'>Available: {product.quantity}</Text>

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
          disabled={disableAddItem || product.quantity === 0}
          // disabled={quantityItem === product.quantity}
          text={product.quantity === 0 ? 'Sold out' : 'Add to Cart'}
        />
      </Row>

      {/*<ShowMoreTextToggler*/}
      {/*  limit={400}*/}
      {/*  classes='text-primary-gray laptop:hidden text-sm leading-7 pb-6 '*/}
      {/*  text={description}*/}
      {/*/>*/}
      {/*<Text classes='text-primary-gray my-6 leading-7 hidden laptop:block'>{description}</Text>*/}

      <Col gap={2}>
        <Row
          gap={4}
          align='center'
        >
          <NextImage
            src='/images/product/cart.png'
            height={52}
            width={55}
            objectFit='contain'
          />
          <Text classes='w-full text-sm'>
            <b>Other people want this.</b> 6 people have this in their carts right now.
          </Text>
        </Row>
        <Row
          gap={4}
          align='center'
        >
          <NextImage
            src='/images/product/star.png'
            height={52}
            width={55}
            objectFit='contain'
          />
          <Text classes='w-full text-sm'>
            Star Seller. This seller consistently earned 5-star reviews, shipped on time, and replied quickly to any
            messages they received.
          </Text>
        </Row>
        <Row
          gap={4}
          align='center'
        >
          <NextImage
            src='/images/product/car.png'
            height={52}
            width={55}
            objectFit='contain'
          />
          <Text classes='w-full text-sm'>
            Arrives by {moment().add(3,'days').format("MMM")} {' '}
            {new Date().getDate() + 3} - {new Date().getDate() + 8} if you order today.
          </Text>
        </Row>
      </Col>
    </Box>
  );
}

function ProductMainInfoWithContext(props) {
  return (
    <CartProvider>
      <CartContext.Consumer>
        {context => <ProductMainInfo {...props} context={context}/>}
      </CartContext.Consumer>
    </CartProvider>
  )
}

export default ProductMainInfoWithContext

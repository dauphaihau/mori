import { useState, useEffect } from 'react'
import { useRouter } from "next/router";

import { CartProvider, CartContext } from 'context/cartContext';
import { useAuth } from 'context/authContext';
import { Drawer } from 'core/components';
import PostCheckoutButton from "./post-checkout-button";
import ProductList from './ProductList';

export const CartDrawer = ({ context, showCartDrawer, setShowCartDrawer }) => {
  const [renderClientSideComponent, setRenderClientSideComponent] = useState(false)
  const { user, setUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setRenderClientSideComponent(true)
  }, [])

  const { numberAllOfItemsInCart } = context

  useEffect(() => {
    setUser({ ...user, numberAllOfItemsInCart })
  }, [numberAllOfItemsInCart])

  useEffect(() => {
    setShowCartDrawer(false)
  }, [router.asPath])

  if (!renderClientSideComponent) return null

  return (
    <Drawer
      onClose={setShowCartDrawer}
      show={showCartDrawer}
    >
      <Drawer.Head
        onClose={setShowCartDrawer}
        title='Your Cart'
      />
      <Drawer.Body>
        <ProductList context={context}/>
      </Drawer.Body>
      <Drawer.Footer classes='mx-auto'>
        <PostCheckoutButton context={context}/>
      </Drawer.Footer>
    </Drawer>
  )
}

export default function CartWithContext(props) {
  return (
    <CartProvider>
      <CartContext.Consumer>
        {context => <CartDrawer {...props} context={context}/>}
      </CartContext.Consumer>
    </CartProvider>
  )
}

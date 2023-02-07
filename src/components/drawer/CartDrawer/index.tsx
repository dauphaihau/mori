import { useEffect } from 'react'
import { useRouter } from "next/router";

import { CartProvider, CartContext } from 'components/context/cartContext';
import { Drawer } from 'core/components';
import CheckoutButton from "./CheckoutButton";
import ProductList from './ProductList';
import { useUIController } from "components/context/UIControllerContext";

export const CartDrawer = ({ context, showCartDrawer, setShowCartDrawer }) => {
  const { setAmountAllItemsCart } = useUIController();
  const router = useRouter();

  const { numberAllOfItemsInCart } = context

  useEffect(() => {
    setAmountAllItemsCart(numberAllOfItemsInCart)
  }, [numberAllOfItemsInCart])

  useEffect(() => {
    setShowCartDrawer(false)
  }, [router.asPath])

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
        <CheckoutButton context={context}/>
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

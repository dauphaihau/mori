import { useState, useEffect } from 'react'
import { useRouter } from "next/router";

import { CartProvider, CartContext } from 'context/cartContext';
import { useAuth } from 'context/authContext';
import { formatDollarUS, slugify, } from 'core/helpers';
import { Button, QuantityPicker, Drawer, Link, Box, Col, Row, Text, NextImage } from 'core/components';
import Enums from "config/enums";
import getStripe from "../../lib/get-stripejs";

export const CartDrawer = ({ context, showCartDrawer, setShowCartDrawer }) => {
  const [renderClientSideComponent, setRenderClientSideComponent] = useState(false)
  const { user, setUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setRenderClientSideComponent(true)
  }, [])

  const {
    numberOfItemsInCart,
    numberAllOfItemsInCart,
    cart, removeFromCart, total, setItemQuantity
  } = context

  useEffect(() => {
    setUser({ ...user, numberAllOfItemsInCart })
  }, [numberAllOfItemsInCart])

  useEffect(() => {
    setShowCartDrawer(false)
  }, [router.asPath])

  const cartEmpty = numberOfItemsInCart === Number(0)

  function increment(item) {
    item.quantity = item.quantity + 1
    setItemQuantity(item)
  }

  function decrement(item) {
    if (item.quantity === 1) return removeFromCart(item);
    item.quantity = item.quantity - 1
    setItemQuantity(item)
  }

  if (!renderClientSideComponent) return null

  const ItemList = () => {
    if (cartEmpty) return (
      <Col
        align='center'
        justify='center'
        classes='h-full text-center'
      >
        <NextImage
          width={300}
          height={300}
          src='/images/empty.png'
          objectFit={'contain'}
          alt='empty'
        />
        <Text
          weight='bold'
          classes='text-xl mb-8'
        >Your cart is empty.</Text>
      </Col>
    )
    return (
      <Col classes='h-full overflow-x-hidden'>
        <Box>
          {
            cart.map((item) => {
              return (
                <Row
                  classes='border-b  py-4'
                  key={item.id}
                >
                  <Box
                    classes='relative group bg-light rounded-lg p-1 cursor-pointer '
                    onClick={() => removeFromCart(item)}
                  >
                    {
                      item?.images &&
                      <NextImage
                        width={96}
                        height={96}
                        src={item.images[0]}
                        alt={item.name}
                        className={'h-24 w-24 tablet:h-28 tablet:w-28 m-0'}
                        objectFit={'contain'}
                      />
                    }
                    <Box
                      classes='
                       transform duration-200 ease-in-out
                       absolute group-hover:block hidden
                       inset-0
                       w-full h-full
                       hover:bg-black
                       opacity-20 rounded-lg
                     '
                    >
                      <Text
                        i
                        classes='fa-solid fa-circle-xmark text-3xl h-20 w-10 text-white
                                  !opacity-1 absolute z-10 right-[30%] top-[32%]'
                      />
                    </Box>
                  </Box>
                  <Box classes='ml-4 w-[64%]'>
                    <Link href={`/product/${slugify(item.name)}`}>
                      <Text classes='text-gray-600 text-sm m-0 w-80'>{item.name}</Text>
                    </Link>
                    <Text classes='text-gray-500 text-sm my-2'>
                      Unit price: {formatDollarUS(item.price)}
                    </Text>
                    <Row justify='between'>
                      <QuantityPicker
                        // size='sx'
                        theme='black'
                        numberOfItems={item.quantity}
                        increment={() => increment(item)}
                        decrement={() => decrement(item)}
                      />
                      <Text classes='text-gray-900 m-0 pt-3 tracking-wider'>
                        {formatDollarUS(item.price * item.quantity)}
                      </Text>
                    </Row>
                  </Box>
                </Row>
              )
            })
          }
        </Box>
      </Col>
    )
  }

  const handleCheckout = async () => {
    const stripe = await getStripe();

    console.log('dauphaihau debug: cart-items', cart)
    const response = await fetch("/api/checkout_sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cart),
    });

    if (response.status !== 200) {
      console.error(`Failed to Proceed because of ${response.status}`);
      // toast.error(`Failed to Proceed because of ${response.status}`);
      return;
    }

    const data = await response.json();

    console.log("Redirecting...");
    // toast.loading("Redirecting...");

    stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <>
      <Drawer
        onClose={setShowCartDrawer}
        show={showCartDrawer}
      >
        <Drawer.Head
          onClose={setShowCartDrawer}
          title='Your Cart'
        />
        <Drawer.Body classes=''>
          {/*<Drawer.Body classes='h-[81%] tablet:h-[85%] desktop:h-[86%]'>*/}
          <ItemList/>
        </Drawer.Body>
        <Drawer.Footer>
          {/* mobile - tablet*/}

          <form
            action='/api/checkout_sessions'
            method='POST'
            className='lg:hidden'
          >
            <section>
              <Button
                type='submit'
                classes='mt-4 font-bold'
                width='full'
                shadow
                size='lg'
                text='Complete Order'
              />
            </section>
          </form>

          {/* laptop */}
          <Button
            size='lg'
            width='full'
            classes='hidden lg:block'
            disabled={cartEmpty}
            onClick={handleCheckout}
            // onClick={() => router.push(Enums.PATH.CHECKOUT._)}
          >
            <Row
              justify='between'
              classes='cursor-pointer text-base '
            >
              <Text classes='text-white text-base mr-2'>Proceed to check out</Text>
              <Text classes='text-white text-base border-l pl-4'>{formatDollarUS(total)}</Text>
            </Row>
          </Button>
        </Drawer.Footer>
      </Drawer>
    </>
  )
}

function CartWithContext(props) {
  return (
    <CartProvider>
      <CartContext.Consumer>
        {context => <CartDrawer {...props} context={context}/>}
      </CartContext.Consumer>
    </CartProvider>
  )
}

export default CartWithContext

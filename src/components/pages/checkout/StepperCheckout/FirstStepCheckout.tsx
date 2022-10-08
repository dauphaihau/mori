import { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { CartProvider, CartContext } from 'context/cartContext';
import { Tooltip, Button, QuantityPicker, Link, Text, Input, Table, Box, Grid, Row } from 'core/components';
import { useAuth } from 'context/authContext';
import { formatDollarUS } from 'core/helpers';

const FirstStepCheckout = (props) => {
  const { setStep } = props;
  const {
    cart, total, removeFromCart,
    setItemQuantity, numberAllOfItemsInCart,
  } = props.context

  const [discounted, setDiscounted] = useState(0)
  const { user, setUser } = useAuth();

  useEffect(() => {
    setUser({ ...user, priceTotal: !discounted ? total : discounted, numberAllOfItemsInCart })
  }, [discounted, numberAllOfItemsInCart])

  const columns = [
    {
      id: 'name', title: 'Product',
      render: (row) => (
        <Row align='center'>
          <Box classes='rounded-lg '>
            <img
              src={row.images[0]}
              className='h-9 w-9 rounded-md '
              alt='avatar'
            />
          </Box>
          <Text classes='ml-4 text-sm font-bold'>{row.name}</Text>
        </Row>
      )
    },
    {
      id: 'price', title: 'Price',
      render: (row) => (<Text>{formatDollarUS(row.price)}</Text>)
    },
    {
      id: 'quantity', title: 'Quantity', align: 'center', render: (row) => (
        <QuantityPicker
          theme='white'
          numberOfItems={row.quantity}
          increment={() => increment(row)}
          decrement={() => decrement(row)}
        />
      )
    },
    {
      id: 'totalPrice', title: 'Total Price', align: 'center',
      render: (row) => (<Text>{formatDollarUS(row.price * row.quantity)}</Text>)
    },
    {
      id: '', title: '', align: 'center',
      render: (row) => <>
        <Tooltip
          title='Delete'
          classes='right-[-13px]'
        >
          <Text
            i
            classes='fa-solid fa-trash-can text-xl w-full cursor-pointer'
            onClick={() => {
              removeFromCart(row);
              // setDiscounted(0);
            }}
          />
        </Tooltip>
      </>
    },
  ];

  function increment(item) {
    item.quantity = item.quantity + 1
    setItemQuantity(item)
    if (discounted) {
      setDiscounted(total * 0.89)
    }
  }

  function decrement(item) {
    if (item.quantity === 1) return removeFromCart(item);
    item.quantity = item.quantity - 1
    setItemQuantity(item)
    if (discounted) {
      setDiscounted(total * 0.89)
    }
  }

  function setSteps(step) {
    setStep(step)
  }

  console.log('dauphaihau debug: cart', cart)

  return (
    <Grid lg={6} gapx={8}>
      <Box classes='tablet:col-span-4'>
        {/*<Text weight='bold' lg='xl' classes='mb-1'>Your Order ({user.numberAllOfItemsInCart} item)</Text>*/}
        <Table
          columns={columns}
          rowsPerPage={4}
          rows={cart}
        />
        <Link href='/products'>
          <Button
            classes='mt-6 px-0 font-bold'
            light
          >
            <Text
              i
              classes='fa-solid fa-angle-left mr-3'
            />
            Continue Shopping
          </Button>
        </Link>
      </Box>
      <Box classes='tablet:col-span-2 mt-6 tablet:mt-0'>
        <Box classes='border border-gray-custom-50 shadow-md p-6 rounded-xl w-full font-light'>
          <Text
            weight='bold'
            classes='text-xl mb-3'
          >Order Summary</Text>
          <Row
            justify='between'
            classes='py-2'
          >
            <Text>Sub Total</Text>
            <Text>{formatDollarUS(total)}</Text>
          </Row>
          <Row
            justify='between'
            classes='py-2'
          >
            <Text>Discount</Text>
            <Text>{discounted ? '-11%' : '-'}</Text>
          </Row>
          <Row
            justify='between'
            classes='py-2'
          >
            <Text>Shipping</Text>
            <Text>Free</Text>
          </Row>
          <Row
            justify='between'
            classes='py-4 border-t'
          >
            <Text weight='bold'>Total</Text>
            <Box classes='text-right font-light'>
              {/*<Text weight='bold'>{formatDollarUS(discounted)}</Text>*/}
              <Text weight='bold'>{formatDollarUS(!discounted ? total : discounted)}</Text>
              <Text classes='text-sm'>(VAT included if applicable)</Text>
            </Box>
          </Row>
          <Box classes='relative'>
            <Input
              name='discounted'
              defaultValue='DISCOUNT11'
              classes='!p-6 font-bold'
            />
            {
              !discounted
                ? <Button
                  light
                  classes='absolute top-[5px] right-[10px]
                     transition font-bold duration-300 ease-in-out text-sm
                     hover:bg-gray-200 p-2 px-3 rounded-xl'
                  onClick={() => setDiscounted(total * 0.89)}
                  text='Apply'
                />
                : <Button
                  light
                  classes='absolute top-[5px] right-[10px]
                   transition font-bold duration-300 ease-in-out text-sm
                   hover:bg-gray-200 p-2 px-3 rounded-xl'
                  onClick={() => setDiscounted(0)}
                  text='Cancel'
                />
            }
          </Box>
        </Box>
        <Button
          classes='mt-4 font-bold'
          disabled={!numberAllOfItemsInCart && true}
          width='full'
          shadow
          size='lg'
          onClick={() => setSteps(2)}
          text='Check out'
        />
      </Box>
    </Grid>
  );
};

function FirstStepCheckoutWithContext(props) {
  return (
    <CartProvider>
      <CartContext.Consumer>
        {context => (
          // <Elements stripe={stripePromise}>
          <FirstStepCheckout {...props} context={context}/>
          // </Elements>
        )}
      </CartContext.Consumer>
    </CartProvider>
  )
}

export default FirstStepCheckoutWithContext

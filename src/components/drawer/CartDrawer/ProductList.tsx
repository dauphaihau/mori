import { Box, Col, formatDollarUS, Link, NextImage, QuantityPicker, Row, slugify, Text } from "../../../core";
import { config } from "config";
import { PATH } from "config/const";
import { useEffect } from "react";
import { useAuth } from "context/authContext";

export default function ProductList({ context }) {
  const { user, setUser } = useAuth();
  const {
    numberOfItemsInCart,
    numberAllOfItemsInCart,
    cart, removeFromCart, setItemQuantity
  } = context

  useEffect(() => {
    setUser({ ...user, numberAllOfItemsInCart })
  }, [numberAllOfItemsInCart])

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
        objectFit='contain'
        alt='empty'
      />
      <Text classes='text-xl mb-8'>Your cart is empty.</Text>
    </Col>
  )

  return (
    <Col classes='h-full overflow-x-hidden'>
      <Box>
        {
          cart.map((item) => {
            return (
              // <Row classes='border-b py-4' key={item.id}>
              <Row classes='py-4' key={item.id}>
                <Box
                  classes='relative group bg-light rounded-lg p-1 cursor-pointer '
                  onClick={() => removeFromCart(item)}
                >
                  {
                    item?.images &&
                    <NextImage
                      width={96}
                      height={96}
                      src={config.hostStaticSource + item.images[0]}
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
                  <Link href={`${PATH.PRODUCT._}/${slugify(item.name)}`}>
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
  );
}

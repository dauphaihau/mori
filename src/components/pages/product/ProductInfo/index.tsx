import React, { useEffect, useState } from 'react';
import {
  NextImage,
  Text,
  Button,
  ShowMoreTextToggler,
  Box,
  Col,
  Row, Breadcrumb, Select
} from 'core/components';
import { CartDrawer } from 'components/drawer';
import RatingStars from './RatingStars';
import { formatDollarUS } from 'core/helpers';
import Enums from "config/enums";
import { ProductType } from "types/product";

interface ProductInfo {
  product: ProductType
  quantityItem: number,
  addItemToCart: (product) => void,
  setQuantityItem: (quantity) => void,
  handleSelectQuantityItem: (quantity) => void,
  disableAddItem: boolean
}

const ProductInfo = (props: ProductInfo) => {
  const { product, addItemToCart, quantityItem, setQuantityItem, disableAddItem, handleSelectQuantityItem } = props;
  const { name, description, salePrice, price, images } = product;
  const [showCartDrawer, setShowCartDrawer] = useState(false)
  const [main, setMain] = useState<string>(images[0]);

  useEffect(() => {
    setMain(images[0])
  }, [images])

  const dataBreadcrumb = [
    { path: Enums.PATH.DEFAULT, name: 'Home' },
    { path: Enums.PATH.PRODUCT._, name: 'Products' },
    { name: product.name },
  ];

  const quantityOptions = new Array(10).fill('').map((_, i) => ({
    label: i + 1,
    value: i + 1
  }));

  const Left = () => {
    return (
      <Box classes='w-full laptop:w-1/2 h-120 pt-2 pb-8 flex-1'>
        <Breadcrumb data={dataBreadcrumb}/>
        <NextImage
          src={main}
          // src={image}
          alt='product'
          width={300}
          height={300}
          objectFit='contain'
          // className='mx-auto'
          // className='tablet:w-[500px] tablet:h-[500px] mx-auto'
          className='w-[300px] h-[300px] laptop:w-[400px] laptop:h-[400px] mx-auto mb-8'
        />
        {
          images.length > 1 && (
            <Row gap={4}>
              {
                images.map((o, index) => {
                  return (
                    <Box
                      key={index}
                      classes='h-20 laptop:h-20 flex-center rounded-lg bg-product cursor-pointer'
                      onClick={() => setMain(images[index])}
                    >
                      <Box classes='flex flex-column justify-center items-center'>
                        <NextImage
                          alt={product.name}
                          src={o}
                          className='w-3/5'
                          width={150}
                          height={150}
                          onMouseMove={() => setMain(images[index])}
                          objectFit='contain'
                          layout='intrinsic'
                        />
                        <Box classes='my-div'></Box>
                      </Box>
                    </Box>

                    // <NextImage
                    //   key={index}
                    //   src={o}
                    //   alt='product'
                    //   width={150}
                    //   height={150}
                    //   objectFit='contain'
                    //   onMouseMove={() => setMain(images[index])}
                    //   // className='mx-auto'
                    //   // className='tablet:w-[500px] tablet:h-[500px] mx-auto'
                    //   className=''
                    // />

                    //   <img
                    //     src={image.url}
                    //     alt={image.filename}
                    //     onMouseMove={() => setMain(images[index])}
                    //     className={`${image.url === main.url ? "active" : null}`}
                    //   />
                  );
                })
              }
            </Row>
          )
        }
        {/*</Box>*/}
      </Box>
    )
  }

  const Right = () => {
    return (
      <Col classes='pt-2 pb-8 px-0 w-full laptop:w-1/2'>
        {/*<Col classes='pt-2 pb-8 px-0 tablet:pl-10 w-full laptop:w-1/2'>*/}
        <Text
          h1
          weight='light'
          classes='text-2xl tablet:text-2xl laptop:text-4xl mt-2 mb-5'
          text={name}
        />
        <Row
          align='center'
          classes='mb-5'
        >
          <RatingStars initialValue={product.rating}/>
          <Text
            weight='medium'
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
            ${price}
          </Text>
        </Text>

        {/*<Text classes='my-3'>Only {product.quantity} piece in stock!</Text>*/}
        <Text classes='mb-5'>Available: {product.quantity}</Text>
        <Row
          align='center'
          gap={4}
          classes='mb-5'
        >
          {
            product.quantity !== 0 &&
            <Select
              name='sort'
              classesSpace='m-0'
              classesBtn='w-20'
              options={quantityOptions}
              onChange={(option) => handleSelectQuantityItem(option.value)}
            />
          }
          <Button
            size='md'
            onClick={() => {
              addItemToCart(product)
              setShowCartDrawer(true)
            }}
            disabled={disableAddItem || product.quantity === 0}
            // disabled={quantityItem === product.quantity}
            text={product.quantity === 0 ? 'Sold out' : 'Add to Cart'}
          />
        </Row>

        <ShowMoreTextToggler
          limit={400}
          classes='text-primary-gray laptop:hidden text-sm leading-7 pb-6 '
          text={description}
        />
        <Text classes='text-primary-gray my-6 leading-7 hidden laptop:block'>{description}</Text>
      </Col>
    )
  }

  return (
    <>
      <CartDrawer
        showCartDrawer={showCartDrawer}
        setShowCartDrawer={setShowCartDrawer}
      />
      <Box classes='flex flex-col laptop:flex-row gap-x-8 pt-12 mb-48 laptop:w-10/12  mx-auto'>
        <Left/>
        <Right/>
      </Box>
    </>
  )
}

export default ProductInfo

import React, { Fragment, useEffect, useState } from 'react';
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
import { clns, formatDollarUS } from 'core/helpers';
import Enums, { STORAGE_KEY } from "config/enums";
import { ProductType } from "types/product";
import { CustomerReview, ProductFaq } from "../index";
import ProductLongInfo from "../ProductLongInfo";
import { quantityProductOpts, sortOpts } from "../../../../assets/data/options";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import CustomerReview2 from "../CustomerReview2";

interface ProductInfo {
  product: ProductType
  quantityItem: number,
  addItemToCart: (product) => void,
  setQuantityItem: (quantity) => void,
  handleSelectQuantityItem: (quantity) => void,
  disableAddItem: boolean
}

const quantityOptions = new Array(10).fill('').map((_, i) => ({
  label: i + 1,
  value: i + 1
}));

const ProductInfo = (props: ProductInfo) => {
  const { product, addItemToCart, quantityItem, setQuantityItem, disableAddItem, handleSelectQuantityItem } = props;
  const { name, description, salePrice, price, images } = product;
  const [showCartDrawer, setShowCartDrawer] = useState(false)
  const [main, setMain] = useState<string>(images[0]);
  const [selected, setSelected] = useState(quantityOptions[0])

  useEffect(() => {
    setMain(images[0])
  }, [images])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storageState = window.localStorage.getItem(STORAGE_KEY)
      if (storageState) {
        const state = JSON.parse(storageState)
        console.log('dauphaihau debug: state', state)
      }
    }
  }, [showCartDrawer])

  const dataBreadcrumb = [
    { path: Enums.PATH.DEFAULT, name: 'Home' },
    { path: Enums.PATH.PRODUCT._, name: 'Products' },
    { name: product.name },
  ];

  useEffect(() => {
    handleSelectQuantityItem(selected.value)
  }, [selected])

  const SelectQuantity = () => {
    return (
      <Listbox
        value={selected}
        onChange={(option) => setSelected(option)}
      >
        {({ open }) => (
          <div className='form-select-input m-0'>
            <Listbox.Button className='form-select-input__btn w-20 py-2'>
                  <span className='flex items-center'>
                                                       <span className='block truncate'>{selected.label}</span>
                                                       </span>
              <span className='ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
                    <SelectorIcon
                      className='h-5 w-5 text-gray-400'
                      aria-hidden='true'
                    />
                  </span>
            </Listbox.Button>
            <Transition
              show={open}
              as={Fragment}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Listbox.Options className='form-select-input__options'>
                {
                  quantityOptions.map((option, index) => (
                    <Listbox.Option
                      key={index}
                      value={option}
                      className={({ active }) => clns(
                        active ? 'text-gray-700 bg-light-200 dark:hover:bg-gray-custom-502 dark:text-white' : 'text-black dark:text-white',
                        'cursor-default select-none relative py-2 rounded-[5px] pl-3 pr-0'
                      )}
                    >
                      {({ selected, active }) => (
                        <>
                          <Row
                            justify='between'
                            align='center'
                          >
                            <span className={clns(' block truncate')}>
                            {/*<span className={clns(selected ? 'font-semibold' : 'font-normal', ' block truncate')}>*/}
                              {option.label}
                            </span>
                            {selected ? (
                              <CheckIcon
                                className='mr-2 h-5 w-5 text-black'
                                aria-hidden='true'
                              />
                            ) : null}
                          </Row>
                        </>
                      )}
                    </Listbox.Option>
                  ))
                }
              </Listbox.Options>
            </Transition>
          </div>
        )}
      </Listbox>
    )
  }

  const Left = () => {
    return (
      <Box classes='w-full laptop:w-8/12 h-120 pt-2 pb-8'>
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
                          width={90}
                          height={90}
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

        <Box classes='hidden laptop:block'>
          <CustomerReview2/>
        </Box>
      </Box>
    )
  }

  const Right = () => {
    return (
      <Col classes='pt-2 pb-8 px-2 laptop:px-0 w-full laptop:w-4/12'>
        <Text
          h1
          weight='light'
          classes='text-xl tablet:text-2xl laptop:text-4xl mt-2 mb-5'
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

        <Text classes='mb-5'>Available: {product.quantity}</Text>
        <Row
          align='center'
          gap={4}
          classes='mb-5'
        >
          {/*{*/}
          {/*  product.quantity !== 0 &&*/}
          {/*  <Select*/}
          {/*    name='sort'*/}
          {/*    classesSpace='m-0'*/}
          {/*    classesBtn='w-20'*/}
          {/*    options={quantityOptions}*/}
          {/*    onChange={({ value }) => handleSelectQuantityItem(value)}*/}
          {/*  />*/}
          {/*}*/}

          {/*<Select*/}
          {/*  name='sort'*/}
          {/*  classesSpace='m-0'*/}
          {/*  classesBtn='w-28'*/}
          {/*  options={quantityProductOpts}*/}
          {/*  onChange={handleSelectQuantityItem}*/}
          {/*  onChange={({ value }) => handleSelectQuantityItem(value)}*/}
          {/*/>*/}

          <SelectQuantity/>

          <Button
            size='md'
            width='full'
            onClick={() => {
              addItemToCart(product)
              setShowCartDrawer(true)
            }}
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
            <p className='w-full text-sm'>
              <b>Other people want this.</b> 6 people have this in their carts right now.
            </p>
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
            <p className='w-full text-sm'>
              Star Seller. This seller consistently earned 5-star reviews, shipped on time, and replied quickly to any
              messages they received.
            </p>
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
            <p className='w-full text-sm'>
              Arrives by Oct 13-18
              if you order today.
            </p>
          </Row>
        </Col>

        <ProductLongInfo description={description}/>

        <Box classes='laptop:hidden'>
          <CustomerReview2/>
        </Box>
      </Col>
    )
  }

  return (
    <>
      <CartDrawer
        showCartDrawer={showCartDrawer}
        setShowCartDrawer={setShowCartDrawer}
      />
      <Box classes='flex flex-col laptop:flex-row gap-x-8 pt-12 laptop:mb-[350px] desktop:w-10/12 mx-auto'>
        {/*<Box classes='flex flex-col laptop:flex-row gap-x-8 pt-12 mb-48 desktop:w-10/12 mx-auto'>*/}
        <Left/>
        <Right/>
      </Box>
    </>
  )
}

export default ProductInfo

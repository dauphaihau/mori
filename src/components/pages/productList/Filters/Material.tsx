import { useEffect, useState } from 'react';

import { clns, formatDollarUS, getUniqueValues, titleIfy } from 'core/helpers';
import { Text, Box, Button, Checkbox, Link, Skeleton } from 'core/components';
import { useRouter } from 'next/router';
import Enums, { PRODUCT_COLORS } from "../../../../config/enums";
import { useCategories } from "../../../../services/product";
import { Disclosure, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
import Price from "./Price";

const PRODUCT_COLORS2 = {
  'all': 'all',
  '#cfcdcb': 'silver',
  '#7a6255': 'greyish-brown',
  '#b99374': 'pale-brown',
  '#f3eed7': 'pale',
  '#000000': 'black',
}

const priceData = [
  { id: '0-500', title: '$0-$500' },
  { id: '500-1000', title: '$501-$1000' },
  { id: '1000-5000', title: '$1001-$5000' },
  { id: '5000', title: "Over $5000" },
]

const colorsData = Object.values(PRODUCT_COLORS)

export const filterSearch = ({ router, ...res }) => {
  const { pathname, query } = router

  const isSame = (key, value) => {
    if (query[key] === value) {
      delete query[key]
    } else {
      query[key] = value
    }
  }

  Object.keys(res).forEach((key) => {
    if (res[key]) isSame(key, res[key])
  })

  router.push({ pathname, query }, undefined, { scroll: false })
}

export default function Filters() {
  const { categories } = useCategories();
  const [category, setCategory] = useState('')
  const [brand, setBrand] = useState('')
  const [color, setColor] = useState('')
  const [priceListChecked, setPriceListChecked] = useState([])
  const router = useRouter()

  const handleColor = (e) => {
    const value = e.target.dataset.color;
    console.log('dauphaihau debug: value', value)
    console.log('dauphaihau debug: router-query', router.query)
    setColor(color === value ? '' : value)
    filterSearch({ router, color: PRODUCT_COLORS2[value] })
  }

  const handleCategory = (e) => {
    const value = e.target.textContent.toLowerCase();
    setCategory(category === value ? '' : value)
    filterSearch({ router, category: value })
  }

  const handleBrand = (e) => {
    const value = e.target.textContent;
    setBrand(brand === value ? '' : value)
    filterSearch({ router, brand: value })
  }

  const handlePrice = (e) => {
    const status = e.target.checked
    const idSelected = e.target.value

    if (!status) {
      const result = priceListChecked.filter(o => o !== idSelected)
      setPriceListChecked(result)
      filterSearch({ router, price: result.length ? result.toString() : idSelected.toString() })
    } else {
      setPriceListChecked([...priceListChecked, idSelected])
      filterSearch({ router, price: [...priceListChecked, idSelected].toString() })
    }
  }

  const handleReset = () => {
    router.query = {}
    setCategory('')
    setBrand('')
    setColor('')
    setPriceListChecked([])
    router.push('/product', undefined, { scroll: false })
  }

  return (
    <Box classes='filters sticky top-[80px] h-auto max-h-[700px] desktop:max-h-[900px] overflow-scroll pl-1'>
      <Box classes='filters__item'>
        {/*<Text*/}
        {/*  h3*/}
        {/*  classes='filters__title'*/}
        {/*>Categories</Text>*/}
        {/*<Box>*/}
        {/*  {categories ? categories?.map(({ _id: name }, idx) => (*/}
        {/*      <button*/}
        {/*        key={idx}*/}
        {/*        type='button'*/}
        {/*        className={clns('filter__btn hover:text-black', category === name && 'is-selected')}*/}
        {/*        name='category'*/}
        {/*        onClick={handleCategory}*/}
        {/*        // onClick={updateFilters}*/}
        {/*      >*/}
        {/*        {titleIfy(name)}*/}
        {/*      </button>*/}
        {/*    ))*/}
        {/*    : <Skeleton*/}
        {/*      quantity={8}*/}
        {/*      width={120}*/}
        {/*      height={28}*/}
        {/*      classes='rounded mb-4'*/}
        {/*    />*/}
        {/*  }*/}
        {/*</Box>*/}


        <Disclosure
          as='div'
          className='mt-3'
        >
          {({ open }) => (
            <>
              <Disclosure.Button
                className='flex w-full justify-between rounded-lg
                      text-left
                     py-4 pr-16 text-[13px]
                     '
              >
                {/*<Disclosure.Button*/}
                {/*  className='flex w-full justify-between rounded-lg*/}
                {/*       hover:bg-gray-custom-50 text-left*/}
                {/*       px-4 py-2 text-[13px]*/}
                {/*       '*/}
                {/*>*/}
                <span className='text-base font-bold md:text-[18px] tracking-wide'>Categories</span>
                <ChevronUpIcon
                  className={clns('h-5 w-5 text-primary-gray',
                    open ? '' : 'transform rotate-180',
                  )}
                />
              </Disclosure.Button>

              <Transition
                enter="transition-opacity ease-linear duration-200"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Disclosure.Panel className='pb-2 text-base text-primary-gray'>
                  {/*<Disclosure.Panel className='p-4 pb-2 text-base text-primary-gray'>*/}
                  <Box>
                    {categories ? categories?.map(({ _id: name }, idx) => (
                        <button
                          key={idx}
                          type='button'
                          className={clns('filter__btn hover:text-black', category === name && 'is-selected')}
                          name='category'
                          onClick={handleCategory}
                          // onClick={updateFilters}
                        >
                          {titleIfy(name)}
                        </button>
                      ))
                      : <Skeleton
                        quantity={8}
                        width={120}
                        height={28}
                        classes='rounded mb-4'
                      />
                    }
                  </Box>

                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>

      </Box>
      <Box classes='filters__item'>
        <Text
          h3
          classes='filters__title'
        >Brands</Text>
        <Box>
          {['Batesville', 'Aurora', 'Astral'].map((name, idz) => (
            <button
              key={idz}
              type='button'
              className={clns('filter__btn', brand === name && 'is-selected')}
              name='brand'
              onClick={handleBrand}
              // onClick={updateFilters}
            >
              {name}
            </button>
          ))}
        </Box>
      </Box>
      <Box classes='filters__item'>
        <Text
          h3
          classes='filters__title'
        >Colors</Text>
        <Box classes='grid grid-cols-4 gap-4 ml-[5px] w-[45%]'>
          {/*<Box classes='flex gap-x-4 ml-[5px]'>*/}
          <button
            name='color'
            onClick={handleColor}
            data-color='all'
            className={color === 'all' ? 'filters__colorBtn filters__colorBtn--all active' : 'filters__colorBtn filters__colorBtn--all'}
          />
          {colorsData.map((c, index) => {
            // {colors.map((c, index) => {
            // if (c === 'all') {
            //   return (
            //     <button
            //       key={index}
            //       name='color'
            //       onClick={updateFilters}
            //       data-color='all'
            //       className={color === 'all' ? 'filters__colorBtn filters__colorBtn--all active' : 'filters__colorBtn filters__colorBtn--all'}
            //     />
            //   );
            // }
            return (
              <button
                key={index}
                name='color'
                style={{ background: c }}
                className={color === c ? 'filters__colorBtn active' : 'filters__colorBtn'}
                data-color={c}
                onClick={handleColor}
              />
            );
          })}
        </Box>
      </Box>

      {/*<Box classes='filters__item'>*/}
      {/*  <Text*/}
      {/*    h3*/}
      {/*    classes='filters__title'*/}
      {/*  >Price</Text>*/}
      {/*  {*/}
      {/*    priceData.map((item, index) => (*/}
      {/*      <Checkbox*/}
      {/*        key={index}*/}
      {/*        classesForm='mb-2'*/}
      {/*        defaultChecked={priceListChecked.includes(item.id)}*/}
      {/*        onChange={handlePrice}*/}
      {/*        value={item.id}*/}
      {/*        name={item.id.toString()}*/}
      {/*        label={item.title}*/}
      {/*      />*/}
      {/*    ))*/}
      {/*  }*/}
      {/*</Box>*/}
      <Price/>

      <Button
        classes='w-fit hidden laptop:block'
        onClick={handleReset}
      >clear all</Button>
    </Box>
  );
}


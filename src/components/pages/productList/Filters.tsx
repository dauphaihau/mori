import { useEffect, useState } from 'react';

import { useFilterContext } from 'context/filterContext';
import { clns, formatDollarUS, getUniqueValues, titleIfy } from 'core/helpers';
import { Text, Box, Button, Checkbox, Link } from 'core/components';
import { useRouter } from 'next/router';
import Enums, { PRODUCT_COLORS } from "../../../config/enums";

const PRODUCT_COLORS2 = {
  '#cfcdcb': 'silver',
  '#7a6255': 'greyish-brown',
  '#b99374': 'pale-brown',
  '#f3eed7': 'pale',
}

const categoriesData = [
  { "name": "casket" },
  { "name": "coffin" },
  { "name": "traditional coffin" },
  { "name": "shrouds" },
  { "name": "child coffin" },
  { "name": "baby coffin" },
  { "name": "cremation urns" },
  { "name": "memorial" }
]

// const categoriesData = [
//   { "name": "casket", },
//   { "name": "natural material coffin", },
//   { "name": "traditional coffin", },
//   { "name": "shrouds", },
//   { "name": "bamboo coffin", },
//   { "name": "child coffin", },
//   { "name": "baby coffin", },
//   { "name": "cremation urns", },
//   { "name": "memorial", }
// ]

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
  const [category, setCategory] = useState('')
  const [brand, setBrand] = useState('')
  const [categories, setCategories] = useState([])
  const [color, setColor] = useState('')
  const [priceListChecked, setPriceListChecked] = useState([])
  const router = useRouter()

  useEffect(() => {
    async function handleSearch() {
      // const data = await getCategories()
      // console.log('dauphaihau debug: data', data)
      setCategories(categoriesData)
    }

    handleSearch()
  }, [])

  const handleColor = (e) => {
    const value = e.target.dataset.color;
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

  // const {
  //   filters: {
  //     // brand,
  //     // category,
  //     // color,
  //     minPrice, maxPrice, price
  //   },
  //   all_products,
  //   updateFilters, clearFilters,
  // } = useFilterContext()
  //
  // const colors = getUniqueValues(all_products, 'colors')

  return (
    <Box classes='filters sticky top-[80px] h-auto max-h-[700px] desktop:max-h-[900px] overflow-scroll pl-1'>
      <Box classes='filters__item'>
        <Text
          h3
          classes='filters__title'
        >Categories</Text>
        <Box>
          {categories?.map(({ name }, idx) => (
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
          ))}
        </Box>
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
        <Box classes='flex gap-x-4 ml-[5px]'>
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
                // onClick={updateFilters}
              />
            );
          })}
        </Box>
      </Box>
      <Box classes='filters__item'>
        <Text
          h3
          classes='filters__title'
        >Price</Text>
        {
          priceData.map((item, index) => (
            <Checkbox
              key={index}
              classesForm='mb-2'
              defaultChecked={priceListChecked.includes(item.id)}
              onChange={handlePrice}
              value={item.id}
              name={item.id.toString()}
              label={item.title}
            />
          ))
        }
      </Box>

      {/*<Box classes='filters__item'>*/}
      {/*  <Text*/}
      {/*    h3*/}
      {/*    classes='filters__title'*/}
      {/*  >Price</Text>*/}
      {/*  <Text classes=''>{formatDollarUS(price, { maximumSignificantDigits: 3, })}</Text>*/}
      {/*  <input*/}
      {/*    type='range'*/}
      {/*    name='price'*/}
      {/*    className='range-input'*/}
      {/*    value={price}*/}
      {/*    min={minPrice}*/}
      {/*    max={maxPrice}*/}
      {/*    onChange={updateFilters}*/}
      {/*  />*/}
      {/*</Box>*/}
      <Button
        classes='w-fit hidden laptop:block'
        onClick={handleReset}
        // onClick={() => clearFilters()}
      >clear all</Button>
    </Box>
  );
}


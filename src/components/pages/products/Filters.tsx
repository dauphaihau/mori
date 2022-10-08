import { useEffect, useState } from 'react';

import { useFilterContext } from 'context/filterContext';
import { clns, formatDollarUS, getUniqueValues, titleIfy } from 'core/helpers';
import { Text, Box, Button } from 'core/components';
import { useUIController } from 'context/UIControllerContext';

// const Filters = () => {
const Filters = ({ launchSticky, quantityProd }) => {

  const {
    filters: {
      brand,
      category,
      minPrice,
      maxPrice,
      color,
      price,
    },
    all_products,
    updateFilters, clearFilters,
  } = useFilterContext()

  const [sticky, setSticky] = useState(false)
  const { categories } = useUIController();

  // useEffect(() => {
  //   const scrollListener = () => {
  //     if (window.scrollY > 40) {
  //       setSticky(true)
  //     } else {
  //       setSticky(false)
  //     }
  //   }
  //   window.addEventListener('scroll', scrollListener)
  //   return () => {
  //     window.removeEventListener('scroll', scrollListener)
  //   }
  // }, [])

  const colors = getUniqueValues(all_products, 'colors')

  return (
    //   <Box classes={`${launchSticky ? 'laptop:sticky top-[12%] h-full': ''}`}>
    <Box classes='filters'>
      <Box classes='filters__item'>
        <Text h3 classes='filters__title'>Categories</Text>
        <Box>
          {categories?.map(({ name }, idz) => (
            <button
              key={idz}
              type='button'
              className={clns('filter__btn hover:text-black', category === name && 'is-selected')}
              name='category'
              onClick={updateFilters}
            >
              {titleIfy(name)}
            </button>
          ))}
        </Box>
      </Box>
      <Box classes='filters__item'>
        <Text h3 classes='filters__title'>Brands</Text>
        <Box>
          {['Batesville', 'Aurora', 'Astral'].map((name, idz) => (
            <button
              key={idz}
              type='button'
              className={clns('filter__btn', brand === name && 'is-selected')}
              name='brand'
              onClick={updateFilters}
            >
              {name}
            </button>
          ))}
        </Box>
      </Box>
      <Box classes='filters__item '>
        <Text h3 classes='filters__title'>Colors</Text>
        <Box classes='flex gap-x-4 ml-[5px]'>
          {colors.map((c, index) => {
            if (c === 'all') {
              return (
                <button
                  key={index}
                  name='color'
                  onClick={updateFilters}
                  data-color='all'
                  className={color === 'all' ? 'filters__colorBtn filters__colorBtn--all active' : 'filters__colorBtn filters__colorBtn--all'}
                />
              );
            }
            return (
              <button
                key={index}
                name='color'
                style={{ background: c }}
                className={color === c ? 'filters__colorBtn active ' : 'filters__colorBtn'}
                data-color={c}
                onClick={updateFilters}
              />
            );
          })}
        </Box>
      </Box>
      <Box classes='filters__item'>
        <Text h3 classes='filters__title'>Price</Text>
        <Text classes=''>{formatDollarUS(price, { maximumSignificantDigits: 3, })}</Text>
        <input
          type='range'
          name='price'
          className='range-input'
          value={price}
          min={minPrice}
          max={maxPrice}
          onChange={updateFilters}
        />
      </Box>
      <Button
        classes='w-fit hidden laptop:block'
        onClick={() => clearFilters()}
      >clear all</Button>
    </Box>
  );
}

export default Filters;

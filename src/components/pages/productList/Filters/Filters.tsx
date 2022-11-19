import { useState } from 'react';
import { Box, Button } from 'core/components';
import { useRouter } from 'next/router';
import { Price } from "./Price";
import { Color } from "./Color";
import { Categories } from "./Categories";
import { useColors } from "../../../../services/product";

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
  const [brand, setBrand] = useState('')
  const router = useRouter()
  // console.log('dauphaihau debug: router-query', router.query)
  const { colors } = useColors(router.query?.category)
  // console.log('dauphaihau debug: colors', colors)

  const handleBrand = (e) => {
    const value = e.target.textContent;
    setBrand(brand === value ? '' : value)
    filterSearch({ router, brand: value })
  }

  const handleReset = () => {
    router.query = {}
    setBrand('')
    router.push('/product', undefined, { scroll: false })
  }

  return (
    <Box classes='filters sticky top-[80px] h-auto max-h-[700px] desktop:max-h-[900px] overflow-scroll pl-1'>
      <Categories/>
      {/*<Box classes='filters__item'>*/}
      {/*  <Text*/}
      {/*    h3*/}
      {/*    classes='filters__title'*/}
      {/*  >Brands</Text>*/}
      {/*  <Box>*/}
      {/*    {['Batesville', 'Aurora', 'Astral'].map((name, idz) => (*/}
      {/*      <button*/}
      {/*        key={idz}*/}
      {/*        type='button'*/}
      {/*        className={clns('filter__btn', brand === name && 'is-selected')}*/}
      {/*        name='brand'*/}
      {/*        onClick={handleBrand}*/}
      {/*        // onClick={updateFilters}*/}
      {/*      >*/}
      {/*        {name}*/}
      {/*      </button>*/}
      {/*    ))}*/}
      {/*  </Box>*/}
      {/*</Box>*/}

      <Color data={colors}/>
      <Price/>
      <Button
        classes='w-fit hidden laptop:block'
        onClick={handleReset}
      >clear all</Button>
    </Box>
  );
}



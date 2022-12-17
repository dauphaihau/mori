import { Box, Button, Divider } from 'core/components';
import { useRouter } from 'next/router';
import { Price } from "./Price";
import { Color } from "./Color";
import { Categories } from "./Categories";
import { useFilters } from "services/product";
import { Material } from "./Material";

export const filterSearch = ({ router, ...res }): void => {
  let { pathname, query } = router

  const isSame = (key, value) => {
    if (query[key] === value) {
      if (key === 'category') {
        query = {}
        return
      }
      delete query[key]

    } else {
      if (key === 'category') {
        query = { category: value }
        return
      }
      query[key] = value
    }
  }

  Object.keys(res).forEach((key) => {
    if (res[key]) isSame(key, res[key])
  })

  router.push({ pathname, query }, undefined, { scroll: false })
}

export default function Filters() {
  const router = useRouter()
  const { colors, materials, prices } = useFilters(router.query?.category)

  const handleReset = () => {
    router.query = {}
    router.push('/product', undefined, { scroll: false })
  }


  return (
    <Box classes='filters sticky'>
      <Box classes='w-[170px]'>
        <Categories/>
        <Box classes="filters__line"/>

        <Material data={materials}/>
        <Box classes="filters__line"/>

        <Color data={colors}/>
        <Box classes="filters__line"/>

        <Price data={prices}/>
        {/*<Box classes="filters__line"/>*/}

        <Button
          classes='w-fit hidden laptop:block mt-4'
          onClick={handleReset}
        >clear all</Button>
      </Box>
    </Box>
  );
}

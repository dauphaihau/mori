import { Box, Button } from 'core/components';
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
    <Box classes='filters sticky top-[80px] h-auto max-h-[700px] desktop:max-h-[900px] overflow-scroll pl-1'>
      <Categories/>
      <Material data={materials}/>
      <Color data={colors}/>
      <Price data={prices}/>
      <Button
        classes='w-fit hidden laptop:block'
        onClick={handleReset}
      >clear all</Button>
    </Box>
  );
}



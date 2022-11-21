import { useFilterContext } from 'context/filterContext';
import { ViewGridIcon, MenuIcon } from '@heroicons/react/outline';
import { sortOpts, sortOptsTest } from 'assets/data/options';
import { Select, Text, Box, Row } from 'core/components';
import { cn } from "core/helpers";
import { filterSearch } from "./Filters/Filters";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Enums from "../../../config/enums";

const Sorter = () => {
  const {
    setGridView,
    gridView,
    updateSort,
  } = useFilterContext()

  const router = useRouter()
  const [sort, setSort] = useState('')

  useEffect(() => {
    if (router.asPath === Enums.PATH.PRODUCT._) {
      setSort(sortOptsTest[0].value)
    }
  }, [router.asPath])

  const handleSort = (value) => {
    setSort(value)
    // filterSearch({ router: 'ahihi', sort: value })
    filterSearch({ router, sort: value })
    // setSort(e.target.value)
    // filterSearch({ router, sort: e.target.value })
  }

  return (
    <Row classes='gap-x-8'>
      <Box classes='hidden tablet:flex items-center'>
        <Text classes='mr-4'>View:</Text>
        <ViewGridIcon
          className={cn('btn-icon mr-1',
            gridView && 'text-black bg-light'
          )}
          onClick={() => setGridView(true)}
        />
        <MenuIcon
          onClick={() => setGridView(false)}
          className={cn('btn-icon',
            !gridView && 'text-black bg-light'
          )}
        />
      </Box>
      <Row
        align='center'
        classes='gap-x-4'
      >
        <Text classes='hidden laptop:block'>Short by:</Text>
        <Select
          name='sort'
          classesSpace='m-0'
          // value={sortOptsTest[2].value}
          value={sort}
          classesBtn='w-[11rem]'
          options={sortOptsTest}
          onChange={({ value }) => handleSort(value)}
        />
        {/*<Select*/}
        {/*  name='sort'*/}
        {/*  classesSpace='m-0'*/}
        {/*  classesBtn='w-[11rem]'*/}
        {/*  options={sortOpts}*/}
        {/*  onChange={({ value }) => updateSort(value)}*/}
        {/*/>*/}
      </Row>
    </Row>
  );
}

export default Sorter;

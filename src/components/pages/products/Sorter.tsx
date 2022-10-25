import { useFilterContext } from 'context/filterContext';
import { ViewGridIcon, MenuIcon } from '@heroicons/react/outline';
import { sortOpts, sortOptsTest } from 'assets/data/options';
import { Select, Text, Box, Row } from 'core/components';
import { clns } from "core/helpers";
import { filterSearch } from "./Filters";
import { useRouter } from "next/router";
import { useState } from "react";

const Sorter = () => {
  const {
    setGridView,
    gridView,
    updateSort,
  } = useFilterContext()
  const router = useRouter()
  const [sort, setSort] = useState('')

  const handleSort = (value) => {
    setSort(value)
    filterSearch({ router, sort: value })
    // setSort(e.target.value)
    // filterSearch({ router, sort: e.target.value })
  }

  return (
    <Row classes='gap-x-8'>
      <Box classes='hidden tablet:flex items-center'>
        <Text classes='mr-4'>View:</Text>
        <ViewGridIcon
          className={clns('btn-icon mr-1',
            gridView && 'text-black bg-light'
          )}
          onClick={() => setGridView(true)}
        />
        <MenuIcon
          onClick={() => setGridView(false)}
          className={clns('btn-icon',
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

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { sortOptions } from 'assets/data/options';
import { Select, Text, Row } from 'core/components';
import { filterSearch } from "./Filters/Filters";
import { PATH } from "config/const";

export default function Sorter() {
  const router = useRouter()
  const [sort, setSort] = useState('')

  useEffect(() => {
    setSort(router.query?.sort as string ?? '')
  }, [])

  useEffect(() => {
    if (router.asPath === PATH.PRODUCT._) {
      setSort(sortOptions[0].value)
    }
  }, [router.asPath])

  const handleSort = (value) => {
    setSort(value)
    filterSearch({ router, sort: value })
  }

  return (
    <Row
      align='center'
      classes='gap-x-4'
    >
      <Text classes='hidden laptop:block'>Short by:</Text>
      <Select
        name='sort'
        classesSpace='m-0'
        value={sort}
        classesBtn='w-[11rem]'
        options={sortOptions}
        onChange={({ value }) => handleSort(value)}
      />
    </Row>
  );
}

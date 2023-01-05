import { useRouter } from "next/router";
import { memo, useEffect, useState } from "react";
import { Disclosure, Transition } from "@headlessui/react";

import { Box, Icons, Row, Skeleton, Text } from 'core/components';
import { filterSearch } from "./Filters";
import { cn, titleIfy } from 'core/helpers';
import { useCategories } from "services/product";
import { PATH, PRODUCT_COLOR } from "config/const";
import { useUIController } from "components/context/UIControllerContext";
import { useMediaQuery, useSessionStorage } from "core/hooks";

export const Categories = memo(() => {
  const { setProgress } = useUIController();
  const router = useRouter()
  const { categories } = useCategories();
  const [category, setCategory] = useState('')
  const [_, setSession] = useSessionStorage('filters', {})

  useEffect(() => {
    setCategory(router.query?.category as string ?? '')
  }, [])

  useEffect(() => {
    // if (router.asPath === PATH.PRODUCT._ || !router.query.hasOwnProperty('category')) {
    if (router.asPath === PATH.PRODUCT._ || router.query.category === 'all') {
      setCategory('')
    }
  }, [router.asPath])

  const handleCategory = (e) => {
    // setProgress((prevState) => prevState + 30)
    const value = e.target.textContent.toLowerCase();
    const categoryValue = category === value ? 'all' : value
    const session = JSON.parse(sessionStorage.getItem('filters'))

    setCategory(categoryValue)
    setSession({ ...session, category: categoryValue })
    filterSearch({ router, category: categoryValue })
  }

  return (
    <Box classes='filters__item'>
      <Disclosure
        as='div'
        defaultOpen
      >
        {({ open }) => (
          <>
            <Disclosure.Button className='w-full pb-4 pr-16 cursor-pointer'>
              <Row align='center' justify='between'>
                <Text h4 classes='tracking-wide'>Categories</Text>
                <Icons.chevronUp
                  className={cn('h-5 w-5 text-primary-gray',
                    { 'transform rotate-180': !open }
                  )}
                />
              </Row>
            </Disclosure.Button>
            <Transition
              enter="transition-opacity ease-linear duration-200"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Disclosure.Panel className='pb-2'>
                <Box>
                  {categories ? categories?.map(({ _id: name }, idx) => (
                      <button
                        key={idx}
                        type='button'
                        className={cn('filter__btn', category === name && 'is-selected')}
                        name='category'
                        onClick={handleCategory}
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
  );
})

Categories.displayName = 'Categories filter'

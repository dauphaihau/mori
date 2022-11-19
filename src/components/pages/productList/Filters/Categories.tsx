import { useRouter } from "next/router";
import { memo, useEffect, useState } from "react";
import { Disclosure, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";

import { Box, Skeleton } from 'core/components';
import { filterSearch } from "./Filters";
import { clns, titleIfy } from 'core/helpers';
import { useCategories } from "services/product";
import Enums from "config/enums";
import { Color } from "./Color";

export const Categories = memo(() => {
  const { categories } = useCategories();
  const router = useRouter()
  const [category, setCategory] = useState('')

  useEffect(() => {
    if (router.asPath === Enums.PATH.PRODUCT._) {
      setCategory('')
    }
  }, [router.asPath])

  const handleCategory = (e) => {
    const value = e.target.textContent.toLowerCase();
    setCategory(category === value ? '' : value)
    filterSearch({ router, category: value })
  }

  return (
    <Box classes='filters__item'>
      <Disclosure
        as='div'
        className='mt-3'
        defaultOpen
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
  );
})

Categories.displayName = 'Categories filter'

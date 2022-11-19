import { useRouter } from "next/router";
import { memo, useEffect, useState } from "react";
import { Disclosure, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";

import { Box, Skeleton } from "core/components";
import { filterSearch } from "./Filters";
import Enums, { PRODUCT_COLORS } from "config/enums";
import { cn } from "core/helpers";

// const PRODUCT_COLORS2 = {
//   'all': 'all',
//   '#cfcdcb': 'silver',
//   '#7a6255': 'greyish-brown',
//   '#b99374': 'pale-brown',
//   '#f3eed7': 'pale',
//   '#000000': 'black',
// }

const PRODUCT_COLORS3 = {
  'all': 'all',
  'silver': '#cfcdcb',
  'greyish-brown': '#7a6255',
  'pale-brown': '#b99374',
  'pale': '#f3eed7',
  'black': '#000000',
}

// const colorsData = Object.values(PRODUCT_COLORS)

export const Color = memo((props) => {
  // console.log('dauphaihau debug: props', props.data)
  const router = useRouter()
  const [color, setColor] = useState('')

  useEffect(() => {
    if (router.asPath === Enums.PATH.PRODUCT._) {
      setColor('')
    }
  }, [router.asPath])

  const handleColor = (e) => {
    const value = e.target.dataset.color;
    console.log('dauphaihau debug: value', value)
    console.log('dauphaihau debug: router-query', router.query)
    setColor(color === value ? '' : value)
    filterSearch({ router, color: value })
  }

  const colorsData = props?.data ? props?.data : []
  // const colorsData = props?.data ? props?.data.unshift('all') : []

  console.log('dauphaihau debug: colors-data', colorsData)

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
              <span className='text-base font-bold md:text-[18px] tracking-wide'>Colors</span>
              <ChevronUpIcon
                className={cn('h-5 w-5 text-primary-gray',
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
                <Box classes='grid grid-cols-4 gap-4 ml-[5px] w-[45%]'>
                  {/*<Box classes='flex gap-x-4 ml-[5px]'>*/}
                  <button
                    name='color'
                    onClick={handleColor}
                    data-color='all'
                    className={color === 'all' ? 'filters__colorBtn filters__colorBtn--all active' : 'filters__colorBtn filters__colorBtn--all'}
                  />

                  {colorsData ? colorsData?.map((c, index) => {
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
                          style={{ background: PRODUCT_COLORS3[c] }}
                          // style={{ background: c }}
                          className={color === c ? 'filters__colorBtn active' : 'filters__colorBtn'}
                          data-color={c}
                          onClick={handleColor}
                        />
                      );
                    })
                    : <Skeleton
                      circle
                      quantity={6}
                      width={28}
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

Color.displayName = 'Color filter'

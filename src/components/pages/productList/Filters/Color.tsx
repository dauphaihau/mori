import { useRouter } from "next/router";
import { memo, useEffect, useState } from "react";
import { Disclosure, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";

import { Box, Skeleton } from "core/components";
import { filterSearch } from "./Filters";
import { PATH, PRODUCT_COLOR } from "config/const";
import { cnn } from "core/helpers";

interface ColorProps {
  data: string[]
}

export const Color = memo((props: ColorProps) => {
  const router = useRouter()
  const [color, setColor] = useState('')

  useEffect(() => {
    if (router.asPath === PATH.PRODUCT._ || !router.query.hasOwnProperty('color')) {
      // setColor('')
      setColor('all')
    }
  }, [router.asPath])

  const handleColor = (e) => {
    const value = e.target.dataset.color;
    setColor(color === value ? '' : value)
    filterSearch({ router, color: value })
  }

  const colorsData = props?.data ? props?.data : []

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
              <span className='text-base font-bold md:text-[18px] tracking-wide'>Color</span>
              <ChevronUpIcon
                className={cnn('h-5 w-5 text-primary-gray',
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
                <Box classes='grid grid-cols-4 gap-4 ml-[5px] w-1/2'>
                  {/*<Box classes='flex gap-x-4 ml-[5px]'>*/}
                  {
                    colorsData.length > 0 &&
                    <button
                      name='color'
                      onClick={handleColor}
                      data-color='all'
                      className={color === 'all' ? 'filters__colorBtn filters__colorBtn--all active' : 'filters__colorBtn filters__colorBtn--all'}
                    />
                  }
                  {colorsData.length > 0 ? colorsData?.map((c, index) => {
                    return (
                      <button
                        key={index}
                        name='color'
                        style={{ background: PRODUCT_COLOR[c.toUpperCase()] }}
                        // style={{ background: c }}
                        className={color === c ? 'filters__colorBtn active' : 'filters__colorBtn'}
                        data-color={c}
                        onClick={handleColor}
                      />
                    );
                  }) : <Skeleton
                    circle
                    classesWrapper='flex gap-4'
                    quantity={5}
                    width={16}
                    height={16}
                    classes='mb-4'
                  />}
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

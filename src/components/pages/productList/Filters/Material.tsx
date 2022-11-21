import { useRouter } from "next/router";
import { memo, useEffect, useState } from "react";
import { Disclosure, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";

import { Box, Skeleton } from "core/components";
import { filterSearch } from "./Filters";
import Enums from "config/enums";
import { cn, titleIfy } from "core/helpers";

interface MaterialProps {
  data: string[]
}

export const Material = memo((props: MaterialProps) => {
  const router = useRouter()
  const [material, setMaterial] = useState('')

  useEffect(() => {
    if (router.asPath === Enums.PATH.PRODUCT._ || !router.query.hasOwnProperty('material')) {
      setMaterial('')
    }
  }, [router.asPath])

  const handleMaterial = (e) => {
    const value = e.target.textContent.toLowerCase();
    setMaterial(material === value ? '' : value)
    filterSearch({ router, material: value })
  }

  // const materialsData = props?.data ? props.data.map(o => o._id) : []
  const materialsData = props?.data ? props?.data : []

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
              <span className='text-base font-bold md:text-[18px] tracking-wide'>Material</span>
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
                <Box>
                  {materialsData ? materialsData?.map((name, idx) => (
                      <button
                        key={idx}
                        type='button'
                        className={cn('filter__btn hover:text-black',
                          material === name && 'is-selected')}
                        name='material'
                        onClick={handleMaterial}
                      >
                        {titleIfy(name)}
                      </button>
                    ))
                    : <Skeleton
                      quantity={6}
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

Material.displayName = 'Material filter'

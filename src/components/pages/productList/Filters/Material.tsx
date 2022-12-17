import { useRouter } from "next/router";
import { memo, useEffect, useState } from "react";
import { Disclosure, Transition } from "@headlessui/react";

import { Box, Icons, Row, Skeleton, Text } from "core/components";
import { filterSearch } from "./Filters";
import { PATH } from "config/const";
import { cn, titleIfy } from "core/helpers";

interface MaterialProps {
  data: string[]
}

export const Material = memo((props: MaterialProps) => {
  const router = useRouter()
  const [material, setMaterial] = useState('')

  useEffect(() => {
    if (router.asPath === PATH.PRODUCT._ || !router.query.hasOwnProperty('material')) {
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
            <Disclosure.Button className='w-full py-4 pr-16 cursor-pointer'>
              <Row align='center' justify='between'>
                <Text h4 classes='tracking-wide'>Material</Text>
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

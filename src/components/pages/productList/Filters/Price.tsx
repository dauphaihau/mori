import { Box, Checkbox, Text } from "core/components";
import { filterSearch } from "./Filters";
import { useRouter } from "next/router";
import { memo, useEffect, useState } from "react";
import Enums from "config/enums";
import { Disclosure, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
import { cn } from "../../../../core";

const priceData = [
  { id: '0-500', title: '$0-$500' },
  { id: '500-1000', title: '$501-$1000' },
  { id: '1000-5000', title: '$1001-$5000' },
  { id: '5000', title: "Over $5000" },
]

// export default function Price() {
export const Price = memo(() => {
  const router = useRouter()
  const [priceListChecked, setPriceListChecked] = useState([])

  const handlePrice = (e) => {
    const status = e.target.checked
    const idSelected = e.target.value

    if (!status) {
      const result = priceListChecked.filter(o => o !== idSelected)
      setPriceListChecked(result)
      filterSearch({ router, price: result.length ? result.toString() : idSelected.toString() })
    } else {
      setPriceListChecked([...priceListChecked, idSelected])
      filterSearch({ router, price: [...priceListChecked, idSelected].toString() })
    }
  }

  useEffect(() => {
    if (router.asPath === Enums.PATH.PRODUCT._) {
      setPriceListChecked([])
    }
  }, [router.asPath])

  console.log('dauphaihau debug: render price')

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
              <span className='text-base font-bold md:text-[18px] tracking-wide'>Price</span>
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
                {
                  priceData.map((item, index) => (
                    <Checkbox
                      key={index}
                      classesForm='mb-2'
                      defaultChecked={priceListChecked.includes(item.id)}
                      onChange={handlePrice}
                      value={item.id}
                      name={item.id.toString()}
                      label={item.title}
                    />
                  ))
                }
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>


    </Box>
  );
}
)


Price.displayName = 'Price filter'

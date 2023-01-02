import { Disclosure, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import { memo, useEffect, useState } from "react";

import { Box, Checkbox, Icons, Row, Skeleton, Text } from "core/components";
import { filterSearch } from "./Filters";
import { PATH } from "config/const";
import { cn } from "core/helpers";
import { useUIController } from "context/UIControllerContext";

interface PriceProps {
  data: {
    id: string,
    title: string,
  }[]
}

export const Price = memo((props: PriceProps) => {
    const { setProgress } = useUIController();
    const router = useRouter()
    const [priceListChecked, setPriceListChecked] = useState([])

    useEffect(() => {
      if (router.asPath === PATH.PRODUCT._ || !router.query.hasOwnProperty('price')) {
        setPriceListChecked([])
      }
    }, [router.asPath])

    const handlePrice = (e) => {
      // setProgress((prevState) => prevState + 30)

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

    const priceData = props?.data ? props.data : []

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
                  <Text h4 classes='tracking-wide'>Price</Text>
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
                  {
                    priceData.length ? priceData.map((item, index) => (
                      <Checkbox
                        key={index}
                        classesForm='mb-2'
                        defaultChecked={priceListChecked.includes(item.id)}
                        onChange={handlePrice}
                        value={item.id}
                        name={item.id.toString()}
                        label={item.title}
                      />
                    )) : <Skeleton
                      quantity={5}
                      width={105}
                      height={24}
                      classes='rounded mb-4'
                    />
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

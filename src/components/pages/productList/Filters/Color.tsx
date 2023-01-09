import { useRouter } from "next/router";
import { memo, useEffect, useState } from "react";
import { Disclosure, Transition } from "@headlessui/react";

import { Box, Icons, Row, Skeleton, Text } from "core/components";
import { filterSearch } from "./Filters";
import { PATH, PRODUCT_COLOR } from "config/const";
import { cn } from "core/helpers";
import { useMediaQuery, useSessionStorage } from "core/hooks";

interface ColorProps {
  data: string[]
}

export const Color = memo((props: ColorProps) => {
  const router = useRouter()
  const [color, setColor] = useState('')
  const [_, setSession] = useSessionStorage('filters', {
    material: undefined
  })
  const isMatchLaptopScreen = useMediaQuery('(min-width: 1280px)')

  useEffect(() => {
    if (router.asPath === PATH.PRODUCT._ || !router.query.hasOwnProperty('color')) {
      // setColor('')
      setColor('all')
    }
  }, [router.asPath])

  const handleColor = (e) => {
    const session = JSON.parse(sessionStorage.getItem('filters'))
    const value = e.target.dataset.color;
    setColor(color === value ? '' : value)

    if (isMatchLaptopScreen) {
      filterSearch({ router, color: value })
      return
    }

    if (color === value) {
      delete session.color
      setSession(session)
    } else {
      setSession({ ...session, color: value })
    }
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
            <Disclosure.Button className='w-full py-4 cursor-pointer'>
              <Row align='center' justify='between'>
                <Text h4 classes='tracking-wide'>Color</Text>
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
                {/*<Disclosure.Panel className='p-4 pb-2 text-base text-primary-gray'>*/}
                {/*<Grid sx={4} gap={4} classes='ml-[5px] w-1/2'>*/}
                <Box classes='grid grid-cols-4 gap-6 gap-x-10 ml-[5px] w-1/2'>
                  {/*<Box classes='flex gap-x-4 ml-[5px]'>*/}
                  {/*<div*/}
                  {/*  className="font-bold text-gray-700 rounded-full bg-red-200 flex items-center justify-center font-mono"*/}
                  {/*  style={{height:30, width:30, fontSize:15}}*/}
                  {/*>404*/}
                  {/*</div>*/}
                  {
                    colorsData.length > 0 &&
                    <button
                      name='color'
                      onClick={handleColor}
                      data-color='all'
                      className={color === 'all' ? 'filters__colorBtn filters__colorBtn--all active' : 'filters__colorBtn filters__colorBtn--all'}
                    />
                  }
                  {
                    colorsData.length > 0 ? colorsData?.map((c, index) => {
                      return (
                        <button
                          key={index}
                          name='color'
                          style={{ background: PRODUCT_COLOR[c.toUpperCase()] }}
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
                    />
                  }
                </Box>
                {/*</Grid>*/}

              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </Box>
  );
})

Color.displayName = 'Color filter'

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { Link, Text, Box, List, Row } from 'core/components';
import { useScrollPosition } from "core/hooks";
import { cn, titleIfy } from 'core/helpers';
import { PATH, SORT_PRODUCT } from "config/const";
import { useUIController } from "context/UIControllerContext";
import { Transition } from "@headlessui/react";

type Category = {
  _id: string,
  count: number
}

export default function MegaMenu({ pageHasBanner, href, title }) {
  const router = useRouter();
  const { categories } = useUIController();
  const [showDropdown, setShowDropdown] = useState(true)
  const scrollPositionY = useScrollPosition();

  useEffect(() => {
    if (showDropdown) {
      setShowDropdown(false)
      setTimeout(() => {
        setShowDropdown(true);
      }, 200);
    }
  }, [router.asPath]);

  return (
    <Box classes='multi-link group'>
      <Box
        onMouseEnter={() => setShowDropdown(true)}
        onMouseLeave={() => setShowDropdown(false)}
        classes={cn('trigger border-b-2 border-transparent',
          router.route === href ? !pageHasBanner ? 'border-black' : 'border-white' : 'border-white',
        )}
      >
        <Link
          href={href}
          classes={cn('trigger__title',
            'group-hover:text-primary-black group-hover:bg-gray-custom-52',
            pageHasBanner && 'text-white',
            pageHasBanner && scrollPositionY > 15 && '!text-primary-gray',
            !pageHasBanner && router.route !== href && 'text-primary-gray',
          )}
        >
          {title}
        </Link>
      </Box>

      <Transition
        show={showDropdown}
        onMouseEnter={() => setShowDropdown(true)}
        onMouseLeave={() => setShowDropdown(false)}
        as={'div'}
        // as={Fragment}

        // for viewport
        // enter='transition ease-out duration-200'
        // enterFrom='transform opacity-0 scale-90 rotate-[-30deg]'
        // enterTo='transform opacity-100 scale-100 rotate-0'
        //
        // leave='transition ease-in duration-200'
        // leaveFrom='transform opacity-100 rotate-0 scale-100'
        // leaveTo='transform opacity-0 rotate-[-10deg] scale-95'

        enter='transition ease-out duration-200'
        enterFrom='transform opacity-0 translate-x-[200px]'
        enterTo='transform opacity-100 translate-x-0'

        leave='transition ease-in duration-200'
        leaveFrom='transform opacity-100 translate-x-0'
        leaveTo='transform opacity-0 translate-x-[200px]'

        // enter='transition ease-out duration-100'
        // enterFrom='transform opacity-0 scale-95'
        // enterTo='transform opacity-100 scale-100'
        //
        // leave='transition ease-in duration-75'
        // leaveFrom='transform opacity-100 scale-100'
        // leaveTo='transform opacity-0 scale-95'
      >
        <Box
          hideIf={!showDropdown}
          classes={cn(
            // 'transition-all duration-300 ease-in-out',
            'absolute bg-white min-w-[500px] shadow-2xl rounded-lg ',
            'invisible opacity-0 mt-0 p-8',
            // 'invisible opacity-0 mt-4 p-8 translate-x-0',
            'group-hover:visible group-hover:opacity-100  hover:flex',
            // 'group-hover:visible group-hover:opacity-100 group-hover:mt-0 hover:flex',
          )}
        >
          <Row classes='gap-20'>
            <Box>
              <Text
                transforms='uppercase'
                noSelect
                classes='mb-4 tracking-widest text-[10px] text-primary-gray'
              >discover</Text>
              <List>
                {
                  discoverData.map((item, index) => (
                    <List.Item key={index}>
                      <Link href={item.url}>
                        <Text classes='hover:text-primary-gray text-primary-black mb-4'>
                          {item.title}
                        </Text>
                      </Link>
                    </List.Item>
                  ))
                }
                {/*<List.Item onClick={() => handleUpdateFilters('lastPiece', true)}>*/}
                {/*  <Link href={PATH.PRODUCT._}>*/}
                {/*    <Text classes='hover:text-primary-gray text-primary-black mb-4'>*/}
                {/*      Last piece*/}
                {/*    </Text>*/}
                {/*  </Link>*/}
                {/*</List.Item>*/}
              </List>
            </Box>

            <Box>
              <Text
                transforms='uppercase'
                noSelect
                classes={`mb-4 tracking-widest text-[10px] text-primary-gray`}
              >categories</Text>
              <List>
                {
                  categories && categories.length > 0 && categories?.map(({ _id: name }: Category, index) => (
                    <List.Item key={index}>
                      <Link href={`${PATH.PRODUCT._}?category=${name.replace(' ', '+')}`}>
                        <Text classes='hover:text-primary-gray text-primary-black mb-4'>
                          {titleIfy(name)}
                        </Text>
                      </Link>
                    </List.Item>
                  )).reverse()
                }
              </List>
            </Box>
          </Row>
        </Box>
      </Transition>
      {/*<div className="ViewportPosition">*/}
      {/*  <div className="NavigationMenuViewport"/>*/}
      {/*</div>*/}
    </Box>
  )
}

const discoverData = [
  {
    title: 'All User',
    url: PATH.PRODUCT._
  },
  {
    title: 'Old in',
    url: `${PATH.PRODUCT._}?sort=${SORT_PRODUCT.DATE_NEW}`
  },
  {
    title: 'Bad Sellers',
    url: `${PATH.PRODUCT._}?sort=${SORT_PRODUCT.BEST_SELLING}`
  },
  // find all item quantity = 0
  // {
  //   title: 'Last piece',
  //   url: PATH.PRODUCT._
  // },
]

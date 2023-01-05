import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Transition } from "@headlessui/react";

import { Link, Text, Box, List, Row } from 'core/components';
import { useScrollPosition } from "core/hooks";
import { cn, titleIfy } from 'core/helpers';
import { PATH } from "config/const";
import { useUIController } from "components/context/UIControllerContext";

export default function MegaMenu({ discoverData, pageHasBanner, href, title }) {
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

  discoverData = discoverData.title === 'Discover' ? discoverData.subMenu : []

  return (
    <Box classes='multi-link group'>
      <div
        onMouseEnter={() => setShowDropdown(true)}
        onMouseLeave={() => setShowDropdown(false)}
        className={cn('trigger border-b-2 border-transparent',
          !pageHasBanner && router.route === href ? 'border-black' : 'border-transparent',
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
      </div>

      <Transition
        show={showDropdown}
        onMouseEnter={() => setShowDropdown(true)}
        onMouseLeave={() => setShowDropdown(false)}
        as={'div'}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Box
          classes={cn(
            'transition-all duration-300 ease-in-out',
            'absolute bg-white min-w-[500px] shadow-2xl rounded-lg ',
            'invisible opacity-0 mt-4 p-8',
            'group-hover:visible group-hover:opacity-100 group-hover:mt-0 hover:flex',
          )}
        >
          <Row classes='gap-20'>
            <Box>
              <Text
                transforms='uppercase'
                noSelect
                classes='mb-4 tracking-widest text-[10px] text-primary-gray'
              >discover</Text>
              <List classes='mt-3'>
                {
                  discoverData.map((item, index) => {
                    return (
                      <List.Item key={index} classes='mb-2'>
                        <Link
                          href={item.href}
                          disabled={item.title === 'Last piece'}
                        >
                          <Text
                            classes={['hover:text-primary-gray text-primary-black mb-4',
                              { 'cursor-not-allowed': item.title === 'Last piece' }
                            ]}
                          >
                            {item.title}
                          </Text>
                        </Link>
                      </List.Item>
                    )
                  })
                }
              </List>
            </Box>

            <Box>
              <Text
                transforms='uppercase'
                noSelect
                classes={`mb-4 tracking-widest text-[10px] text-primary-gray`}
              >categories</Text>
              <List classes='mt-3'>
                {
                  categories && categories.length > 0 && categories?.map(({ _id: name }: {_id: string}, index) => (
                    <List.Item key={index} classes='mb-2'>
                      <Link href={`${PATH.PRODUCT._}?category=${name.replace(' ', '+')}`}>
                        <Text classes='hover:text-primary-gray text-primary-black mb-4'>
                          {titleIfy(name)}
                        </Text>
                      </Link>
                    </List.Item>
                  ))
                }
              </List>
            </Box>
          </Row>
        </Box>
      </Transition>
    </Box>
  )
}

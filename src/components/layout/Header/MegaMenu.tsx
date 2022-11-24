import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { Link, Text, Box, List, Row } from 'core/components';
import { useScrollPosition } from "core/hooks";
import { cnn, titleIfy } from 'core/helpers';
import { PATH, SORT_PRODUCT } from "config/const";
import { useUIController } from "context/UIControllerContext";

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
        classes={cnn('trigger border-b-2 border-transparent',
          router.route === href ? !pageHasBanner ? 'border-black' : 'border-white' : 'border-white',
        )}
      >
        <Link
          href={href}
          classes={cnn('trigger__title',
            'group-hover:text-primary-black group-hover:bg-gray-custom-52',
            pageHasBanner && 'text-white',
            pageHasBanner && scrollPositionY > 15 && '!text-primary-gray',
            !pageHasBanner && router.route !== href && 'text-primary-gray',
          )}
        >
          {title}
        </Link>
      </Box>

      <Box
        hideIf={!showDropdown}
        classes={cnn(
          'transition-all duration-300 ease-in-out ',
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
                ))
              }
            </List>
          </Box>
        </Row>
      </Box>
    </Box>
  )
}

const discoverData = [
  {
    title: 'All Products',
    url: PATH.PRODUCT._
  },
  {
    title: 'New in',
    url: `${PATH.PRODUCT._}?sort=${SORT_PRODUCT.DATE_NEW}`
  },
  {
    title: 'Best Sellers',
    url: `${PATH.PRODUCT._}?sort=${SORT_PRODUCT.BEST_SELLING}`
  },
  // find all item quantity = 0
  // {
  //   title: 'Last piece',
  //   url: PATH.PRODUCT._
  // },
]

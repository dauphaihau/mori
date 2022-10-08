import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { Link, Text, Box, List, Row } from 'core/components';
import { useScrollPosition } from "core/hooks";
import { clns } from 'core/helpers';
import Enums from "config/enums";
import { useFilterContext } from "context/filterContext";

const MegaMenu = ({ categories, pageHasBanner, path, title }) => {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(true)
  const { updateFilters, updateSort } = useFilterContext()
  const scrollPositionY = useScrollPosition();

  useEffect(() => {
    if (showDropdown) {
      setShowDropdown(false)
      setTimeout(() => {
        setShowDropdown(true);
      }, 200);
    }
  }, [router.asPath]);

  const handleUpdateFilters = (name, value) => {
    updateFilters({ target: { name, value } })
  }

  return (
    <Box classes='multi-link group'>
      <Box
        classes={clns('trigger border-b-2 border-transparent',
          router.route === path ? !pageHasBanner ? 'border-black' : 'border-white' : 'border-white',
        )}
      >
        <Link
          href={path}
          classes={clns('trigger__title',
            'group-hover:text-primary-black group-hover:bg-gray-custom-52',
            pageHasBanner && 'text-white',
            pageHasBanner && scrollPositionY > 15 && '!text-primary-gray',
            !pageHasBanner && router.route !== path && 'text-primary-gray',
          )}
        >
          {title}
        </Link>
      </Box>

      <Box
        hideIf={!showDropdown}
        classes={clns(
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
              <List.Item>
                <Link href={Enums.PATH.PRODUCT._}>
                  <Text classes='hover:text-primary-gray text-primary-black mb-4'>
                    All Products
                  </Text>
                </Link>
              </List.Item>
              <List.Item onClick={() => updateSort(Enums.SORT_PRODUCT.DATE_NEW)}>
                <Link href={Enums.PATH.PRODUCT._}>
                  <Text classes='hover:text-primary-gray text-primary-black mb-4'>
                    New in
                  </Text>
                </Link>
              </List.Item>
              <List.Item onClick={() => updateSort(Enums.SORT_PRODUCT.BEST_SELLING)}>
                <Link href={Enums.PATH.PRODUCT._}>
                  <Text classes='hover:text-primary-gray text-primary-black mb-4'>
                    Best Sellers
                  </Text>
                </Link>
              </List.Item>
              <List.Item onClick={() => handleUpdateFilters('lastPiece', true)}>
                <Link href={Enums.PATH.PRODUCT._}>
                  <Text classes='hover:text-primary-gray text-primary-black mb-4'>
                    Last piece
                  </Text>
                </Link>
              </List.Item>
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
                categories?.map((category, index) => {
                  return <List.Item key={index}>
                    <Link
                      href={Enums.PATH.PRODUCT._}
                      onClick={() => handleUpdateFilters('category', category.charAt(0) + category.slice(1))}
                    >
                      <Text classes='hover:text-primary-gray text-primary-black mb-4'>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </Text>
                    </Link>
                  </List.Item>
                })
              }
            </List>
          </Box>
        </Row>
      </Box>
    </Box>
  )
}

export default MegaMenu

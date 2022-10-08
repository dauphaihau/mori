import React, { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { MenuIcon } from '@heroicons/react/outline';

import { clns } from 'core/helpers';
import navbarData from 'assets/data/navbarData';
import { Link, Text, Box, List, Row } from 'core/components';
import { NavMobileDrawer } from 'components/drawer';
import { useScrollPosition } from "core/hooks";
import Enums from "config/enums";
import { useFilterContext } from "context/filterContext";
import MegaMenu from "./MegaMenu";

const LeftNavbar = ({ categories, pageHasBanner, showSearchBar }) => {
  const [showNavMobileDrawer, setShowNavMobileDrawer] = useState(false)
  const scrollPositionY = useScrollPosition();
  const router = useRouter();


  return (
    <>
      <NavMobileDrawer
        showNavMobileDrawer={showNavMobileDrawer}
        setShowNavMobileDrawer={setShowNavMobileDrawer}
      />
      <Row
        align='center'
        classes='navbar__leftSide flex-1'
      >
        <MenuIcon
          className={clns('menu-mobile stroke-1',
            !pageHasBanner && '!text-primary-black',
            pageHasBanner && scrollPositionY > 15 ? 'text-primary-black' : 'text-white',
          )}
          onClick={() => setShowNavMobileDrawer(true)}
        />

        <Box classes='hidden laptop:block'>
          {/*<button onClick={() => setSearch(true)}>search</button>*/}
          <Row
            // classes='mt-1'
            classes={clns('mt-1',
              // showSearchBar && 'fade-in-start'
            )}
          >
            {
              navbarData.map(({ path, title }, index) => {
                if (path === Enums.PATH.PRODUCT._) {
                  return <MegaMenu
                    key={index}
                    path={path}
                    categories={categories}
                    title={title}
                    pageHasBanner={pageHasBanner}
                  />
                }
                return (
                  <Box
                    // data-fade={index}
                    key={index}
                    classes={clns('single-link',
                      router.route === path ? pageHasBanner && scrollPositionY < 15 ? 'active--white' : 'active' : 'default',
                    )}
                  >
                    <Link
                      hideIf={!pageHasBanner}
                      href={path}
                      classes={clns('single-link__title',
                        scrollPositionY > 15 ? 'scrolling' : 'non-scroll'
                      )}
                    >
                      {title}
                    </Link>
                    <Link
                      hideIf={pageHasBanner}
                      href={path}
                      classes={clns('single-link__title',
                        router.route !== path ? 'default' : 'active',
                      )}
                    >
                      {title}
                    </Link>
                  </Box>
                )
              })}
          </Row>
        </Box>
      </Row>
    </>
  );
}

export default LeftNavbar;

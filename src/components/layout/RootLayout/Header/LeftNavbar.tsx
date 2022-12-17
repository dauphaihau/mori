import React, { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { cn } from 'core/helpers';
import { Link, Text, Box, List, Row, Icons } from 'core/components';
import { NavMobileDrawer } from 'components/drawer';
import { useScrollPosition } from "core/hooks";
import { PATH } from "config/const";
import MegaMenu from "./MegaMenu";
import { headerConfig } from 'config/header';
import MegaMenu2 from './MegaMenu2';

const LeftNavbar = ({ pageHasBanner, showSearchBar }) => {
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
        // classes='navbar__leftSide'
        classes='navbar__leftSide flex-1'
      >
        <Icons.menu
          className={cn('menu-mobile stroke-1',
            !pageHasBanner && '!text-primary-black',
            pageHasBanner && scrollPositionY > 15 ? 'text-primary-black' : 'text-white',
          )}
          onClick={() => setShowNavMobileDrawer(true)}
          width={35}
          height={25}
        />

        <Box classes='hidden laptop:block'>
          <Row classes='mt-1'>
            {/*<span*/}
            {/*  className={`bg-gray-custom-52  px-10 rounded-[4px] mt-2*/}
            {/*absolute h-10 w-10 -top-1 duration-500 translate-x-0 z-[-1]*/}
            {/*`}*/}
            {/*></span>*/}
            {
              headerConfig.mainNav.map(({ href, title }, index) => {
                if (href === PATH.PRODUCT._) {
                  return <Fragment key={index}>
                    <MegaMenu
                      href={href}
                      title={title}
                      pageHasBanner={pageHasBanner}
                    />
                    {/*<MegaMenu2*/}
                    {/*  key={index}*/}
                    {/*  href={href}*/}
                    {/*  title={title}*/}
                    {/*  pageHasBanner={pageHasBanner}*/}
                    {/*/>*/}
                  </Fragment>
                }
                return (
                  <Box
                    key={index}
                    classes={cn('single-link',
                      router.route === href ? pageHasBanner && scrollPositionY < 15 ? 'active--white' : 'active' : 'default',
                    )}
                  >
                    <Link
                      hideIf={!pageHasBanner}
                      href={href}
                      classes={cn('single-link__title',
                        scrollPositionY > 15 ? 'scrolling' : 'non-scroll'
                      )}
                    >
                      {title}
                    </Link>
                    <Link
                      hideIf={pageHasBanner}
                      href={href}
                      classes={cn('single-link__title',
                        // 'group-hover:text-black',
                        router.route !== href ? 'default' : 'active',
                      )}
                    >
                      {title}
                    </Link>
                  </Box>
                )
              })}
          </Row>
          {/*<div className="ViewportPosition">*/}
          {/*  <div className="NavigationMenuViewport"/>*/}
          {/*</div>*/}
        </Box>

      </Row>
    </>
  );
}

export default LeftNavbar;
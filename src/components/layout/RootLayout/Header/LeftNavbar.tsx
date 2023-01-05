import React, { Fragment, useState } from 'react';
import { useRouter } from 'next/router';

import { cn } from 'core/helpers';
import { Link, Box, Row, Icons } from 'core/components';
import { NavMobileDrawer } from 'components/drawer';
import { useScrollPosition } from "core/hooks";
import { PATH } from "config/const";
import MegaMenu from "./MegaMenu";
import { headerConfig } from 'config/header';

export default function LeftNavbar({ pageHasBanner }) {
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
            {
              headerConfig.mainNav.map(({ href, title, subMenu }, index) => {
                if (href === PATH.PRODUCT._) {
                  return <Fragment key={index}>
                    <MegaMenu
                      href={href}
                      title={title}
                      discoverData={subMenu[0]}
                      pageHasBanner={pageHasBanner}
                    />
                  </Fragment>
                }
                return (
                  <Box
                    key={index}
                    classes={['single-link',
                      router.route === href ? pageHasBanner && scrollPositionY < 15 ? 'active--white' : 'active' : 'default'
                    ]}
                  >
                    <Link
                      hideIf={!pageHasBanner}
                      href={href}
                      classes={['single-link__title',
                        scrollPositionY > 15 ? 'scrolling' : 'non-scroll'
                      ]}
                    >
                      {title}
                    </Link>
                    <Link
                      hideIf={pageHasBanner}
                      href={href}
                      classes={['single-link__title',
                        router.route !== href ? 'default' : 'active'
                      ]}
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


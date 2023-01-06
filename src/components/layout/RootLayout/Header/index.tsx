import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { Box, Link } from 'core/components';
import RightNavbar from './RightNavbar';
import LeftNavbar from "./LeftNavbar";
import { PATH } from "config/const";
import { useScrollDirection, useScrollPosition } from "core/hooks";

const routeHasBanner = [PATH.DEFAULT, PATH.ABOUT._]

export default function Header() {
  const [pageHasBanner, setPageHasBanner] = useState(false)
  const [showSearchBar, setShowSearchBar] = useState(false)
  const scrollPositionY = useScrollPosition();
  const scrollDirection = useScrollDirection()
  const router = useRouter();

  useEffect(() => {
    if (routeHasBanner.includes(router.route)) {
      setPageHasBanner(true)
    }
    return () => setPageHasBanner(false)
  }, [router.asPath]);

  return (
    <>
      <Box
        header
        classes={['header',
          scrollDirection === 'down' ? '-top-16' : 'top-0',
          {
            'border-none': pageHasBanner && scrollPositionY < 15,
            'scrolling': scrollPositionY > 15
          }
        ]}
      >
        <Box nav classes='navbar'>
          <LeftNavbar pageHasBanner={pageHasBanner}/>
          <Link
            href={PATH.HOME}
            classes={['logo text-2xl font-bold uppercase',
              {
                'text-primary-black': pageHasBanner && scrollPositionY > 15,
                'text-white': pageHasBanner && scrollPositionY < 15
              },
            ]}
          >Mori</Link>
          <RightNavbar
            showSearchBar={showSearchBar}
            setShowSearchBar={setShowSearchBar}
            pageHasBanner={pageHasBanner}
          />
        </Box>
      </Box>
    </>
  );
}

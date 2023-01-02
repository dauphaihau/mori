import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { Box, Link } from 'core/components';
import RightNavbar from './RightNavbar';
import LeftNavbar from "./LeftNavbar";
import { PATH } from "config/const";
import { cn } from "core/helpers";
import { useScrollPosition } from "core/hooks";
import { useScrollDirection } from "core/hooks/useScrollDirection";

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
    } else setPageHasBanner(false)
  }, [router.asPath]);

  return (
    <Box
      header
      classes={['header',
        pageHasBanner && scrollPositionY < 15 && 'border-none',
        scrollPositionY > 15 && 'scrolling',
        scrollDirection === 'down' ? '-top-16' : 'top-0'
      ]}
    >
      <Box nav classes='navbar'>
        <LeftNavbar
          showSearchBar={showSearchBar}
          pageHasBanner={pageHasBanner}
        />
        <Link
          href={PATH.HOME}
          classes={cn('logo text-2xl font-bold uppercase',
            pageHasBanner && 'text-white',
            pageHasBanner && scrollPositionY > 15 && 'text-primary-black'
          )}
        >
          Mori
        </Link>

        <RightNavbar
          showSearchBar={showSearchBar}
          setShowSearchBar={setShowSearchBar}
          pageHasBanner={pageHasBanner}
        />
      </Box>
    </Box>
  );
}

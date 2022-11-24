import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { Box, Link } from 'core/components';
import RightNavbar from './RightNavbar';
import LeftNavbar from "./LeftNavbar";
import Const from "config/const";
import { cnn } from "core/helpers";
import { useScrollPosition } from "core/hooks";

const routeHasBanner = [Const.PATH.DEFAULT, Const.PATH.ABOUT._]

export default function Header() {
  const [pageHasBanner, setPageHasBanner] = useState(false)
  const [showSearchBar, setShowSearchBar] = useState(false)
  const scrollPositionY = useScrollPosition();
  const router = useRouter();

  useEffect(() => {
    if (routeHasBanner.includes(router.route)) {
      setPageHasBanner(true)
    } else setPageHasBanner(false)
  }, [router.asPath]);

  return (
    <>
      <Box
        header
        classes={cnn('header',
          scrollPositionY < 15 && pageHasBanner && 'border-none',
          scrollPositionY > 15 && 'scrolling'
        )}
      >
        <Box nav classes='navbar'>
          <LeftNavbar
            showSearchBar={showSearchBar}
            pageHasBanner={pageHasBanner}
          />
          <Link
            href={Const.PATH.HOME}
            classes={cnn('logo text-2xl font-bold uppercase',
              pageHasBanner && 'text-white',
              pageHasBanner && scrollPositionY > 15 && '!text-primary-black'
            )}
          >
            Mori
          </Link>
          <RightNavbar
            showSearchBar={showSearchBar}
            setShowSearchBar={setShowSearchBar}
            pageHasBanner={pageHasBanner}/>
        </Box>
      </Box>
    </>
  );
}

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { Box, Link, Row } from 'core/components';
import RightNavbar from './RightNavbar';
import LeftNavbar from "./LeftNavbar";
import { PATH } from "config/const";
import { cn } from "core/helpers";
import { useScrollPosition } from "core/hooks";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
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

      {/*<NavigationMenu.Root className="NavigationMenuRoot">*/}
      {/*  <Box classes='w-full'>*/}
      {/*    <NavigationMenu.List className="NavigationMenuList">*/}
      {/*      <Row>*/}
      {/*        <NavigationMenu.Item>*/}
      {/*          <NavigationMenu.Trigger className="NavigationMenuTrigger">*/}
      {/*            Shop*/}
      {/*          </NavigationMenu.Trigger>*/}
      {/*          <NavigationMenu.Content className="NavigationMenuContent">*/}
      {/*            <ul className="List one">*/}
      {/*              <li style={{ gridRow: 'span 3' }}>*/}
      {/*                <NavigationMenu.Link asChild>*/}
      {/*                  <a className="Callout" href="/public">*/}
      {/*                    <svg aria-hidden width="38" height="38" viewBox="0 0 25 25" fill="white">*/}
      {/*                      <path d="M12 25C7.58173 25 4 21.4183 4 17C4 12.5817 7.58173 9 12 9V25Z"></path>*/}
      {/*                      <path d="M12 0H4V8H12V0Z"></path>*/}
      {/*                      <path d="M17 8C19.2091 8 21 6.20914 21 4C21 1.79086 19.2091 0 17 0C14.7909 0 13 1.79086 13 4C13 6.20914 14.7909 8 17 8Z"></path>*/}
      {/*                    </svg>*/}
      {/*                    <div className="CalloutHeading">Radix Primitives</div>*/}
      {/*                    <p className="CalloutText">Unstyled, accessible components for React.</p>*/}
      {/*                  </a>*/}
      {/*                </NavigationMenu.Link>*/}
      {/*              </li>*/}

      {/*              <ListItem href="https://stitches.dev/" title="Stitches">*/}
      {/*                CSS-in-JS with best-in-class developer experience.*/}
      {/*              </ListItem>*/}
      {/*              <ListItem href="/colors" title="Colors">*/}
      {/*                Beautiful, thought-out palettes with auto dark mode.*/}
      {/*              </ListItem>*/}
      {/*              <ListItem href="https://icons.radix-ui.com/" title="Icons">*/}
      {/*                A crisp set of 15x15 icons, balanced and consistent.*/}
      {/*              </ListItem>*/}
      {/*            </ul>*/}
      {/*          </NavigationMenu.Content>*/}
      {/*        </NavigationMenu.Item>*/}

      {/*        <NavigationMenu.Item>*/}
      {/*          <NavigationMenu.Trigger className="NavigationMenuTrigger">*/}
      {/*            About*/}
      {/*          </NavigationMenu.Trigger>*/}
      {/*          <NavigationMenu.Content className="NavigationMenuContent">*/}
      {/*            <ul className="List two">*/}
      {/*              <ListItem title="Introduction" href="/docs/primitives/overview/introduction">*/}
      {/*                Build high-quality, accessible design systems and web apps.*/}
      {/*              </ListItem>*/}
      {/*              <ListItem title="Getting started" href="/docs/primitives/overview/getting-started">*/}
      {/*                A quick tutorial to get you up and running with Radix Primitives.*/}
      {/*              </ListItem>*/}
      {/*              <ListItem title="Styling" href="/docs/primitives/overview/styling">*/}
      {/*                Unstyled and compatible with any styling solution.*/}
      {/*              </ListItem>*/}
      {/*              <ListItem title="Animation" href="/docs/primitives/overview/animation">*/}
      {/*                Use CSS keyframes or any animation library of your choice.*/}
      {/*              </ListItem>*/}
      {/*              <ListItem title="Accessibility" href="/docs/primitives/overview/accessibility">*/}
      {/*                Tested in a range of browsers and assistive technologies.*/}
      {/*              </ListItem>*/}
      {/*              <ListItem title="Releases" href="/docs/primitives/overview/releases">*/}
      {/*                Radix Primitives releases and their changelogs.*/}
      {/*              </ListItem>*/}
      {/*            </ul>*/}
      {/*          </NavigationMenu.Content>*/}
      {/*        </NavigationMenu.Item>*/}

      {/*        <NavigationMenu.Item>*/}
      {/*          <NavigationMenu.Trigger className="NavigationMenuTrigger">*/}
      {/*            News*/}
      {/*          </NavigationMenu.Trigger>*/}
      {/*        </NavigationMenu.Item>*/}
      {/*      </Row>*/}

      {/*      <NavigationMenu.Item>*/}
      {/*        <Link*/}
      {/*          href={PATH.HOME}*/}
      {/*          classes={cn('logo text-2xl font-bold uppercase',*/}
      {/*            pageHasBanner && 'text-white',*/}
      {/*            pageHasBanner && scrollPositionY > 15 && '!text-primary-black'*/}
      {/*          )}*/}
      {/*        >*/}
      {/*          Mori*/}
      {/*        </Link>*/}
      {/*      </NavigationMenu.Item>*/}

      {/*      <NavigationMenu.Item>*/}
      {/*        <RightNavbar*/}
      {/*          showSearchBar={showSearchBar}*/}
      {/*          setShowSearchBar={setShowSearchBar}*/}
      {/*          pageHasBanner={pageHasBanner}*/}
      {/*        />*/}
      {/*      </NavigationMenu.Item>*/}

      {/*      <NavigationMenu.Indicator className="NavigationMenuIndicator">*/}
      {/*        <div className="Arrow"/>*/}
      {/*      </NavigationMenu.Indicator>*/}
      {/*    </NavigationMenu.List>*/}
      {/*    <div className="ViewportPosition">*/}
      {/*      <NavigationMenu.Viewport className="NavigationMenuViewport"/>*/}
      {/*    </div>*/}
      {/*  </Box>*/}
      {/*</NavigationMenu.Root>*/}
    </Box>
  );
}

const ListItem = React.forwardRef(({ className, children, title, ...props }, forwardedRef) => (
  <li>
    <NavigationMenu.Link asChild>
      <a className={cn('ListItemLink', className)} {...props} ref={forwardedRef}>
        <div className="ListItemHeading">{title}</div>
        <p className="ListItemText">{children}</p>
      </a>
    </NavigationMenu.Link>
  </li>
));

ListItem.displayName = 'list Item'

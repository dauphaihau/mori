import React, { useState } from 'react';

import { useAuth } from 'components/context/authContext';
import { Link, Button, Box, Row } from 'core/components';
import { CartDrawer } from 'components/drawer';
import { LoginRegisterDialog, SearchProductDialog } from 'components/dialog';
import { cn } from 'core/helpers';
import { useMediaQuery, useScrollPosition } from "core/hooks";
import { Icons } from "core/components/Icons";
import { ROLE, PATH } from "config/const";
import { useRouter } from "next/router";

function RightNavbar({ pageHasBanner, setShowSearchBar, showSearchBar }) {
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const [showCartDrawer, setShowCartDrawer] = useState(false)
  const isMatchLaptopScreen = useMediaQuery('(min-width: 1280px)')
  const scrollPositionY = useScrollPosition();
  const router = useRouter()
  const { user } = useAuth();

  return (
    <>
      <SearchProductDialog
        showSearchProductDialog={showSearchBar}
        setShowSearchProductDialog={setShowSearchBar}
      />
      <LoginRegisterDialog
        showLoginDialog={showLoginDialog}
        setShowLoginDialog={setShowLoginDialog}
      />
      <CartDrawer
        showCartDrawer={showCartDrawer}
        setShowCartDrawer={setShowCartDrawer}
      />

      <Row
        classes='flex-1'
        justify='end'
        align='center'
        gap={3}
      >
        <Button
          light
          classes='!p-0'
          onClick={() => setShowSearchBar(true)}
        >
          <Icons.search
            className={cn('stroke-1 cursor-pointer',
              pageHasBanner && scrollPositionY > 15 ? 'text-primary-black' : 'text-white',
              !pageHasBanner && 'text-primary-black'
            )}
            data-testid='searchIcon'
            width={35}
            height={25}
          />
        </Button>
        <Button
          light
          classes='!p-0'
          onClick={() => setShowCartDrawer(true)}
        >
          <Row
            justify='end'
            classes='flex-1 relative'
            align='center'
          >
            <Icons.bag
              width={35}
              height={25}
              className={cn('stroke-1 cursor-pointer',
                pageHasBanner && scrollPositionY > 15 ? 'text-primary-black' : 'text-white',
                !pageHasBanner && 'text-primary-black'
              )}
            />
            {
              user?.numberAllOfItemsInCart > 0 && (
                <Box
                  classes={['absolute inset-0 left-4 flex-center rounded-2xl h-[15px] w-[44%]  text-[10px]',
                    pageHasBanner && scrollPositionY > 15 ? 'text-white bg-primary-black' : 'bg-white text-primary-black',
                    !pageHasBanner && 'text-white bg-primary-black',
                    user.numberAllOfItemsInCart >= 10 && 'h-[13px] px-[10px]',
                    user.numberAllOfItemsInCart >= 100 && 'px-[13px]',
                  ]}
                >
                  {user.numberAllOfItemsInCart >= 100 ? '99+' : user.numberAllOfItemsInCart}
                </Box>
              )
            }
          </Row>
        </Button>
        <Box classes='hidden tablet:block cursor-pointer'>
          {
            user?.role === ROLE.ACCOUNT ?
              <Link href={PATH.ACCOUNT._}>
                <Icons.userSolid
                  className={cn('stroke-1',
                    pageHasBanner && scrollPositionY > 15 ? 'text-primary-black' : 'text-white',
                    !pageHasBanner && 'text-primary-black'
                  )}
                  width={35}
                  height={25}
                  data-testid='userIcon-logged'
                />
              </Link>
              : <Icons.user
                width={35}
                className={cn('stroke-1',
                  pageHasBanner && scrollPositionY > 15 ? 'text-primary-black' : 'text-white',
                  !pageHasBanner && 'text-primary-black'
                )}
                height={25}
                data-testid='userIcon-login'
                onClick={() => {
                  if (isMatchLaptopScreen) {
                    setShowLoginDialog(true)
                  } else {
                    router.push(PATH.ACCOUNT.LOGIN)
                  }
                }}
              />
          }
        </Box>
      </Row>
    </>
  )
}

export default RightNavbar

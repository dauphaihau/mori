import React, { useState } from 'react';
import { ShoppingBagIcon, UserIcon, SearchIcon } from '@heroicons/react/outline';
import { UserIcon as UserIconSolid } from '@heroicons/react/solid';

import { useAuth } from 'context/authContext';
import { Link, Button, Box, Row } from 'core/components';
import { CartDrawer } from 'components/drawer';
import { LoginRegisterDialog, SearchProductDialog } from 'components/dialog';
import { clns } from 'core/helpers';
import Enums from 'config/enums';
import { useScrollPosition } from "core/hooks";
import useMediaQuery from 'core/hooks/useMediaQuery';

function RightNavbar({ pageHasBanner, setShowSearchBar, showSearchBar }) {
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const [showCartDrawer, setShowCartDrawer] = useState(false)
  const scrollPositionY = useScrollPosition();
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

      <Row classes='flex-1' justify='end'>
        <Button
          light
          classes='mr-4 p-0'
          onClick={() => setShowSearchBar(true)}
        >
          <SearchIcon
            className={clns('stroke-1',
              pageHasBanner && scrollPositionY > 15 ? 'text-primary-black' : 'text-white',
              !pageHasBanner && '!text-primary-black'
            )}
            width={35}
            height={25}
          />
        </Button>
        <Button
          light
          classes='tablet:mr-4 p-0'
          onClick={() => setShowCartDrawer(true)}
        >
          <Row
            justify='end'
            classes='flex-1 relative'
          >
            <ShoppingBagIcon
              className={clns('stroke-1',
                pageHasBanner && scrollPositionY > 15 ? 'text-primary-black' : 'text-white',
                !pageHasBanner && '!text-primary-black'
              )}
              width={35}
              height={25}
            />
            {
              user?.numberAllOfItemsInCart > 0 && (
                <Box
                  classes={clns('absolute inset-0 left-4 flex-center rounded-2xl h-[15px] w-[44%]  text-[10px]',
                    pageHasBanner && scrollPositionY > 15 ? 'text-white bg-primary-black' : 'bg-white text-primary-black',
                    !pageHasBanner && 'text-white bg-primary-black',
                    user.numberAllOfItemsInCart >= 10 && 'h-[13px] px-[10px]',
                    user.numberAllOfItemsInCart >= 100 && 'px-[13px]',
                  )}
                >
                  {user.numberAllOfItemsInCart >= 100 ? '99+' : user.numberAllOfItemsInCart}
                </Box>
              )
            }
          </Row>
        </Button>
        <Box classes='hidden tablet:block cursor-pointer'>
          {
            user?.role === Enums.ROLE.ACCOUNT ?
              <Link href={Enums.PATH.ACCOUNT._}>
                <UserIconSolid
                  className={clns('stroke-1',
                    pageHasBanner && scrollPositionY > 15 ? 'text-primary-black' : 'text-white',
                    !pageHasBanner && '!text-primary-black'
                  )}
                  width={35}
                  height={25}
                />
              </Link>
              : <UserIcon
                width={35}
                className={clns('stroke-1',
                  pageHasBanner && scrollPositionY > 15 ? 'text-primary-black' : 'text-white',
                  !pageHasBanner && '!text-primary-black'
                )}
                height={25}
                onClick={() => setShowLoginDialog(true)}
              />
          }
        </Box>
      </Row>
    </>
  )
}

export default RightNavbar

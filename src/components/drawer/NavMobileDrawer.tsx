import { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import { XIcon } from '@heroicons/react/outline';

import { cn } from 'core/helpers';
import { Drawer, List, Button, Box, Row, Link, Text, Divider } from 'core/components';
import  { PATH } from 'config/const';
import { MinusIcon, PlusIcon } from "@heroicons/react/solid";
import { headerConfig } from "config/header";
import { MainNavItem } from "types";

const Dropdown = ({ subMenus, dropdown, depthLevel }) => {
  depthLevel += 1
  const dropdownClass = depthLevel > 1 ? 'dropdown-menu' : ''

  return (
    <List
      classes={cn('overflow-hidden ease-in-out duration-500 pl-4',
        dropdown ? 'max-h-96' : 'max-h-0',
        // classes={cn('overflow-hidden ease-in duration-500 pl-4 max-h-full',
        //   dropdown ? 'max-h-96' : 'h-0',

        depthLevel === 1 && dropdown && 'py-4',
        depthLevel === 2 && `border-l-2 border-[#797978] ${dropdown ? 'my-6' : 'my-2'}`
      )}
    >
      {subMenus.map((subMenu, index) => (
        <MenuItems
          key={index}
          items={subMenu}
          depthLevel={depthLevel}
        />
      ))}
    </List>
  )
}

const MenuItems = ({ items, depthLevel }: {items: MainNavItem, depthLevel: number}) => {
  const [dropdown, setDropdown] = useState(false);

  return (
    <List.Item classes='flex flex-col mb-1'>
      {
        items.subMenu ? (
          <>
            <Row
              justify='between'
              align='center'
              onClick={() => setDropdown((prev) => !prev)}
              classes={cn('cursor-pointer ',
                depthLevel === 0 && 'py-4'
              )}
            >
              <Text
                classes={cn(
                  '',
                  depthLevel === 0 && 'text-[12px] text-white uppercase tracking-[.20em]',
                  depthLevel === 1 && 'text-[11px] text-[#777676] uppercase tracking-[.20em]',
                  depthLevel === 2 && 'text-[15px] text-[#797978]'
                )}
                text={items.title}
              />

              <Button
                light
                text={dropdown ? <MinusIcon
                  height={15}
                  width={15}
                /> : <PlusIcon
                  height={15}
                  width={15}
                />}
                classes={cn('',
                  'text-white p-0 text-xl px-[0.7rem]',
                  depthLevel === 1 && 'text-[#777676]',
                  depthLevel === 2 && 'text-[#797978]',
                  'transition-all duration-500 ease-in-out',
                  dropdown ? 'rotate-180' : '-rotate-0'
                )}
              />
            </Row>
            <Dropdown
              depthLevel={depthLevel}
              dropdown={dropdown}
              subMenus={items.subMenu}
            />
          </>
        ) : (
          <Link
            href={items.href}
            text={items.title}
            // onClick={() => items.childDiscover ? handleDiscover(items.title) : {}}
            classes={cn(
              'transition duration-700 ease-in-out rounded-lg',
              'text-[#fbfbfb]',
              depthLevel === 0 && 'py-4 text-white text-[12px] uppercase tracking-widest',
              depthLevel === 1 && 'text-[11px] text-[#777676] uppercase tracking-widest',
              depthLevel === 2 && 'text-[15px] !text-[#8e8d8d] font-light pb-2'
            )}
          />
        )
      }
      {
        depthLevel === 0 &&
        <Divider classes='border-[#555454]'/>
      }
    </List.Item>
  )
}

const NavMobileDrawer = ({ showNavMobileDrawer, setShowNavMobileDrawer }) => {
  const router = useRouter();

  useEffect(() => {
    setShowNavMobileDrawer(false)
  }, [router.asPath])

  return (
    <Drawer
      theme='black'
      show={showNavMobileDrawer}
      onClose={() => setShowNavMobileDrawer(false)}
      classes='w-4/5 tablet:w-[300px] left-0 translate-x-[-110%] laptop:hidden'
      zIndex={20}
    >
      <Drawer.Head>
        <Row
          justify='between'
          align='center'
          classes='pt-8 pl-5 pr-[27px] h-[4%] tablet:py-10 laptop:py-4 tablet:h-[6.6%] laptop:h-[8.4%] desktop:h-[5.6%]'
        >
          <Link
            href={PATH.HOME}
            classes='logo text-2xl font-bold text-white'
            text='MORI'
          />
          <XIcon
            onClick={() => setShowNavMobileDrawer(false)}
            className='text-white cursor-pointer'
            height={20}
            width={20}
          />
        </Row>
      </Drawer.Head>
      <Drawer.Body>
        <Box
          aside
          classes={'mt-10'}
        >
          <List>
            {
              headerConfig.mainNav.map((menu, idx) => {
                const depthLevel = 0;
                return <MenuItems
                  key={idx}
                  items={menu}
                  depthLevel={depthLevel}
                />
              })
            }
            <List.Item classes='mt-4'>
              <Link
                href={PATH.ACCOUNT.LOGIN}
                classes='text-[15px] text-[#797978] '
                text='Account'
              />
            </List.Item>
            <List.Item classes='mt-4'>
              <Link
                href={PATH.ABOUT._}
                classes='text-[15px] text-[#797978] '
                text='Contact'
              />
            </List.Item>
            <List.Item classes='mt-4'>
              <Link
                href={PATH.ABOUT._}
                classes='text-[15px] text-[#797978] '
                text='Retailers'
              />
            </List.Item>
          </List>

        </Box>
      </Drawer.Body>
    </Drawer>
  )
}

export default NavMobileDrawer

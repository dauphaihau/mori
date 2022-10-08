import { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import { XIcon } from '@heroicons/react/outline';

import { clns, slugify } from 'core/helpers';
import fetchCategories from 'assets/data/InventoryData/provider/categoryProvider';
import { Drawer, List, Button, Box, Row, Link, Text, NextImage } from 'core/components';
// import { data as navbarData } from '../../../assets/data/NavbarData';
import Enums from 'config/enums';
import navbarData from 'assets/data/navbarData';
import { useLoaded } from "../../core/hooks/useLoaded";

const SubNav = ({ links, title }) => {
  const [active, setActive] = useState(false)
  if (!links) return null;

  return (
    <>
      <Box
        classes='drawer__dropdown'
        onClick={() => setActive(!active)}
      >
        <Text classes='py-[10px] text-white group'>{title}</Text>
        <Button
          light
          classes='text-white p-0 text-xl px-[0.7rem]'
        >
          {active ? '-' : '+'}
        </Button>
      </Box>
      <Box
        classes={clns('drawer__suvlink',
          active ? 'max-h-96' : 'max-h-0 '
          // active ? 'max-h-96' : 'max-h-0'
          // active && 'block'
        )}
      >
        <List>
          {links.map((link, index) => (
            <List.Item key={index}>
              <Link href={`/categories/${slugify(link)}`}>
                <Text>{link.charAt(0).toUpperCase() + link.slice(1)}</Text>
              </Link>
            </List.Item>
          ))}
        </List>
      </Box>
    </>
  )
}

const NavMobileDrawer = ({ showNavMobileDrawer, setShowNavMobileDrawer }) => {
  const router = useRouter();
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const initLoad = async () => {
      const categories = await fetchCategories()
      setCategories(categories)
    }
    initLoad()
  }, [])

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
            href={Enums.PATH.DEFAULT}
            classes='logo text-2xl font-bold text-white'
          >
            {/*<NextImage*/}
            {/*  src='/images/logo-dark.png'*/}
            {/*  alt='logo'*/}
            {/*  width={88}*/}
            {/*  height={47}*/}
            {/*/>*/}
            MORI
          </Link>
          <XIcon
            onClick={() => setShowNavMobileDrawer(false)}
            className='text-white cursor-pointer'
            height={20}
            width={20}
          />
        </Row>
      </Drawer.Head>
      <Drawer.Body>
        <Box classes='drawer__links'>
          {
            navbarData.map(({ isSubNav, path, title }, index) => {
              if (isSubNav) {
                return (
                  <SubNav
                    key={index}
                    title={title}
                    links={categories}
                  />
                )
              }
              return (
                <Link
                  // dataFade={index}
                  href={path}
                  key={index}
                  className='mr-4'
                >
                  <Text
                    // data-fade={index}
                    classes='transition duration-200 ease-in-out text-white py-[10px] rounded-lg'
                  >
                    {title}
                  </Text>
                </Link>
              )
            })
          }
        </Box>
      </Drawer.Body>
    </Drawer>
  )
}

export default NavMobileDrawer

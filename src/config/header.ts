import { PATH } from 'config/const';
import { HeaderConfig } from 'types';

export const headerConfig: HeaderConfig = {
  mainNav: [
    // {
    //   title: 'Home',
    //   href: PATH.HOME
    // },
    {
      title: 'Shop',
      href: PATH.PRODUCT._,
      subMenu: [
        {
          title: 'Discover',
          href: PATH.PRODUCT._,
          subMenu: [
            {
              title: 'All Products',
              href: PATH.PRODUCT._,
              childDiscover: true,
              subMenu: null
            },
            {
              title: 'New in',
              href: PATH.PRODUCT._,
              childDiscover: true,
              subMenu: null
            },
            {
              title: 'Best Sellers',
              href: PATH.PRODUCT._,
              childDiscover: true,
              subMenu: null
            },
            {
              title: 'Last piece',
              href: PATH.PRODUCT._,
              childDiscover: true,
              subMenu: null
            },
          ]
        },
        {
          title: 'Categories',
          // title: 'Products',
          href: PATH.PRODUCT._,
          subMenu: [
            {
              title: 'American Caskets',
              // title: 'Products',
              href: PATH.PRODUCT._,
              subMenu: null,
            },
            {
              title: 'Natural Material Coffin',
              // title: 'Products',
              href: PATH.PRODUCT._,
              subMenu: null,
            },
            {
              title: 'Traditional Coffin',
              // title: 'Products',
              href: PATH.PRODUCT._,
              subMenu: null,
            },
            {
              title: 'Bamboo Coffin',
              // title: 'Products',
              href: PATH.PRODUCT._,
              subMenu: null,
            },
            {
              title: 'Pine Coffin',
              // title: 'Products',
              href: PATH.PRODUCT._,
              subMenu: null,
            },
            {
              title: 'Wicker',
              // title: 'Products',
              href: PATH.PRODUCT._,
              subMenu: null,
            },
            {
              title: 'Child Coffin',
              // title: 'Products',
              href: PATH.PRODUCT._,
              subMenu: null,
            },
          ]
        },
        // {
        //   title: 'Collections',
        //   // title: 'Products',
        //   href: PATH.PRODUCT._,
        //   subMenu: null,
        // },
      ]
    },
    {
      title: 'About',
      href: PATH.ABOUT._,
      subMenu: null,
    },
    {
      title: 'News',
      href: PATH.NEWS._,
      subMenu: null,
    }
  ]
}

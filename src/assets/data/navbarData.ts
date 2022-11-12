import Enums from 'config/enums';

export default [
  // {
  //   title: 'Home',
  //   path: Enums.PATH.HOME
  // },
  {
    title: 'Shop',
    path: Enums.PATH.PRODUCT._,
    subMenu: [
      {
        title: 'Discover',
        path: Enums.PATH.PRODUCT._,
        subMenu: [
          {
            title: 'All Products',
            path: Enums.PATH.PRODUCT._,
            childDiscover: true,
            subMenu: null
          },
          {
            title: 'New in',
            path: Enums.PATH.PRODUCT._,
            childDiscover: true,
            subMenu: null
          },
          {
            title: 'Best Sellers',
            path: Enums.PATH.PRODUCT._,
            childDiscover: true,
            subMenu: null
          },
          {
            title: 'Last piece',
            path: Enums.PATH.PRODUCT._,
            childDiscover: true,
            subMenu: null
          },
        ]
      },
      {
        title: 'Categories',
        // title: 'Products',
        path: Enums.PATH.PRODUCT._,
        subMenu: [
          {
            title: 'American Caskets',
            // title: 'Products',
            path: Enums.PATH.PRODUCT._,
            subMenu: null,
          },
          {
            title: 'Natural Material Coffin',
            // title: 'Products',
            path: Enums.PATH.PRODUCT._,
            subMenu: null,
          },
          {
            title: 'Traditional Coffin',
            // title: 'Products',
            path: Enums.PATH.PRODUCT._,
            subMenu: null,
          },
          {
            title: 'Bamboo Coffin',
            // title: 'Products',
            path: Enums.PATH.PRODUCT._,
            subMenu: null,
          },
          {
            title: 'Pine Coffin',
            // title: 'Products',
            path: Enums.PATH.PRODUCT._,
            subMenu: null,
          },
          {
            title: 'Wicker',
            // title: 'Products',
            path: Enums.PATH.PRODUCT._,
            subMenu: null,
          },
          {
            title: 'Child Coffin',
            // title: 'Products',
            path: Enums.PATH.PRODUCT._,
            subMenu: null,
          },
        ]
      },
      // {
      //   title: 'Collections',
      //   // title: 'Products',
      //   path: Enums.PATH.PRODUCT._,
      //   subMenu: null,
      // },
    ]
  },
  {
    title: 'About',
    path: Enums.PATH.ABOUT._,
    subMenu: null,
  },
  {
    title: 'News',
    path: Enums.PATH.NEWS._,
    subMenu: null,
  }
]

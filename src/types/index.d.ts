
export type NavItem = {
  title: string
  href: string
  subMenu?: SubMenu[]
  // disabled?: boolean
  // subMenu?: {
  //   title: string
  //   href: string
  //   subMenu?: {
  //     title: string
  //     href: string
  //     childDiscover?: boolean
  //     subMenu?: {
  //       title: string
  //       href: string
  //       childDiscover?: boolean
  //       subMenu?: {
  //         title: string
  //         href: string
  //       }[]
  //     }[]
  //   }[]
  // }[]
  //
}

export type MainNavItem = NavItem

type SubMenu  = {
  childDiscover? : boolean
} & MainNavItem

export type HeaderConfig = {
  mainNav: MainNavItem[]
}



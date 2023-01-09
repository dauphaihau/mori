export const BASE_URL = process.env.NODE_ENV === "production" ? process.env.NEXT_PUBLIC_BASE_URL : "http://localhost:3000"
// export const BASE_URL = process.env.NODE_ENV === "production" ? process.env.NEXT_PUBLIC_BASE_URL : "http://127.0.0.1:3000"

export const STORAGE_KEY = 'MORI_ECOMMERCE'

export enum USER_STATUS {NOT_ACTIVATED = -1, LOCKED, ACTIVE}

export enum ROLE {BASIC, ACCOUNT}

export const SORT_PRODUCT = {
  BEST_SELLING: '-sold',
  PRICE_LOWEST: 'price',
  PRICE_HIGHEST: '-price',
  DATE_OLD: 'oldest',
  DATE_NEW: '-createdAt',
  NAME_A: 'name-a',
  NAME_Z: 'name-z',
}

export const PRODUCT_COLOR = {
  'ALL': 'all',
  'SILVER': '#cfcdcb',
  'GREYISH-BROWN': '#7a6255',
  'PALE-BROWN': '#b99374',
  'PALE': '#f3eed7',
  'BLACK': '#000000',
}

export const PATH = {
  DEFAULT: '/',
  HOME: '/',
  ACCOUNT: {
    _: '/account',
    ADDRESS: '/account/address',
    LOGIN: '/account/login',
    REGISTER: '/account/register',
    FORGOT_PASSWORD: '/account/forgot-password',
    RESET_PASSWORD: '/account/reset-password',
  },
  PRODUCT: {
    _: '/product',
  },
  CATEGORIES: {
    _: '/categories',
  },
  ABOUT: {
    _: '/about',
  },
  CHECKOUT: {
    _: '/checkout',
  },
  NEWS: {
    _: '/news',
  },
  COMMON: {
    CREATE: '/create',
    UPDATE: '/update',
    DETAIL: '/detail',
    PARAMS: {
      USER_ID: '/:userId',
      CUSTOMER_ID: '/:customerId',
      SME_ID: '/:smeId',
      COMPANY_ID: '/:id',
      CONTRACT_ID: '/:contractId',
      VOUCHER_ID: '/:voucherId',
      REWARD_ID: '/:rewardId',
      NEWS_ID: '/:newsId',
      TERM_ID: '/:id',
    },
  },
};

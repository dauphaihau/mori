export const STORAGE_KEY = 'COFFIN_ECOMMERCE'

export enum USER_STATUS {NOT_ACTIVATED = -1, LOCKED, ACTIVE}

export enum ROLE {
  BASIC,
  ACCOUNT
}

export enum SORT_PRODUCT {
  BEST_SELLING = 'best-selling',
  PRICE_LOWEST = 'price-lowest',
  PRICE_HIGHEST = 'price-highest',
  DATE_OLD = 'date-old',
  DATE_NEW = 'date-new',
  NAME_A = 'name-a',
  NAME_Z = 'name-z',
}

const PATH = {
  DEFAULT: '/',
  HOME: '/',
  ACCOUNT: {
    _: '/account',
    ADDRESS: '/account/address',
    LOGIN: '/account/login',
    FORGOT_PASSWORD: '/account/forgot-password',
    RESET_PASSWORD: '/account/reset-password',
  },
  PRODUCT: {
    _: '/products',
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

enum PRODUCT_BRAND {
  AURORA = 'aurora',
  BATESVILLE = 'batesville',
  ASTRAL = 'astral',
}

enum PRODUCT_COLOR {
  LIGHT_GRAY = 'light-gray',
  LIGHT_BROWN = 'light-brown',
  DARK_BROWN = 'dark-brown',
  CREAM = 'cream',
}

enum PRODUCT_CATEGORIES {
  NATURAL_MATERIAL_COFFIN = 'natural material coffin',
  AMERICAN_CASKETS = 'american caskets',
  TRADITIONAL = 'traditional',
}

enum PRODUCT_TAGS {
  COFFIN = 'coffin',
  CASKET = 'casket',
  DEATH = 'death',
  DIE = 'die',
  WILLOW = 'willow',
  CURVED = 'curved',
}

class Enums {
  static get ROLE() {
    return ROLE;
  }

  static get PATH() {
    return PATH;
  }

  static get PRODUCT_BRAND() {
    return PRODUCT_BRAND;
  }

  static get PRODUCT_COLOR() {
    return PRODUCT_COLOR;
  }

  static get PRODUCT_CATEGORIES() {
    return PRODUCT_CATEGORIES;
  }

  static get PRODUCT_TAGS() {
    return PRODUCT_TAGS;
  }
  static get SORT_PRODUCT() {
    return SORT_PRODUCT;
  }
}

export default Enums;

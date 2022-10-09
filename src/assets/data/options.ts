import moment from 'moment';
import { capitalize } from "core/helpers";
import Enums from "config/enums";

// export const sortProductOptions = Object.keys(SORT_PRODUCT).map(key => ({
//   label: capitalize(SORT_PRODUCT[key]),
//   value: SORT_PRODUCT[key]
// }))


export enum QUANTITY_PRODUCT {
  ONE = 1,
  TWO
  // PRICE_HIGHEST = 'price-highest',
  // DATE_OLD = 'date-old',
  // DATE_NEW = 'date-new',
  // NAME_A = 'name-a',
  // NAME_Z = 'name-z',
}

export const quantityProductOpts = [
  // {
  //   label: 'Default',
  //   // label: 'Sort Options',
  //   value: '',
  // },
  {
    label: 'cak',
    value: QUANTITY_PRODUCT.ONE
  },
  {
    label: 'twooo',
    value: QUANTITY_PRODUCT.TWO
  },
  {
    label: 'ca3ca',
    value: 'three'
  },
  {
    label: 'ca4ca',
    value: 'four'
  },
  {
    label: 'ca5ca',
    value: 'five'
  },
]

export const sortOpts = [
  {
    label: 'Default',
    // label: 'Sort Options',
    value: '',
  },
  {
    label: 'Best Selling',
    value: Enums.SORT_PRODUCT.BEST_SELLING
  },
  {
    label: 'Price: low-high',
    value: Enums.SORT_PRODUCT.PRICE_LOWEST
  },
  {
    label: 'Price: high-low',
    value: Enums.SORT_PRODUCT.PRICE_HIGHEST
  },
  {
    label: 'Date: new-old',
    value: Enums.SORT_PRODUCT.DATE_NEW
  },
  {
    label: 'Date: old-new',
    value: Enums.SORT_PRODUCT.DATE_OLD
  },
  {
    label: 'Name: a-z',
    value: Enums.SORT_PRODUCT.NAME_A
  },
  {
    label: 'Name: z-a',
    value: Enums.SORT_PRODUCT.NAME_Z
  },
]


export const deliveryOpts = [
  {
    value: 'slowDelivery',
    name: 'Standard delivery (Free)',
    description: `Delivered in ${moment().add(10, 'days').format('LL')}`,
  },
  {
    value: 'fastDelivery',
    name: 'Fast delivery ($2,00)',
    description: `Delivered in ${moment().add(3, 'days').format('LL')}`,
  },
]

export const paymentOpts = [
  {
    value: 'card',
    name: 'Credit / Debit CardNews',
    description: 'We support Mastercard, Visa, Discover and Stripe.',
  },
  {
    value: 'cash',
    name: 'Cash on Checkout Delivery',
    description: 'Pay with cash when your order is delivered.',
  },
]

export const sortByOpts = [
  {
    label: 'Ascend',
    value: 'asc',
  },
  {
    label: 'Descend',
    value: 'desc',
  },
];
export const searchByOptsProducts = [
  {
    label: 'Name',
    value: 'name',
  },
  {
    label: 'SKU',
    value: 'sku',
  },
  {
    label: 'Price',
    value: 'price',
  },
  {
    label: 'Quantity',
    value: 'quantity',
  },
];


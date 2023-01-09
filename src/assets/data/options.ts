import dayjs from 'dayjs';
import { SORT_PRODUCT } from "config/const";
// import { countriesData } from './Country';

type Option = {
  label: string,
  value: string | number
}

// export const sortProductOptions = Object.keys(SORT_PRODUCT).map(key => ({
//   label: capitalize(SORT_PRODUCT[key]),
//   value: SORT_PRODUCT[key]
// }))

// console.log('dauphaihau debug: countries-data', countriesData)

// export const countriesOptions = countriesData.list.map(item => ({
//   label: item.title,
//   value: item.id
// }))


// export const countryOptions: Option[] = countryJson

export const sortOptions: Option[] = [
  {
    label: 'Best Selling',
    value: SORT_PRODUCT.BEST_SELLING
  },
  {
    label: 'Price: low-high',
    value: SORT_PRODUCT.PRICE_LOWEST
  },
  {
    label: 'Price: high-low',
    value: SORT_PRODUCT.PRICE_HIGHEST
  },
  {
    label: 'Date: new-old',
    value: SORT_PRODUCT.DATE_NEW
  },
  {
    label: 'Date: old-new',
    value: SORT_PRODUCT.DATE_OLD
  },
  {
    label: 'Name: a-z',
    value: SORT_PRODUCT.NAME_A
  },
  {
    label: 'Name: z-a',
    value: SORT_PRODUCT.NAME_Z
  },
]

export const deliveryOpts = [
  {
    value: 'slowDelivery',
    name: 'Standard delivery (Free)',
    description: `Delivered in ${dayjs().add(10, 'days').format('LL')}`,
  },
  {
    value: 'fastDelivery',
    name: 'Fast delivery ($2,00)',
    description: `Delivered in ${dayjs().add(3, 'days').format('LL')}`,
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

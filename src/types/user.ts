type AddressUser = {
  name: string,
  phone: string,
  addressDetail: string,
}

export interface IUser {
  role: number;
  address: AddressUser
  order: any;
  payment: string;
  email: string;
  delivery: string;
  name: string;
  numberAllOfItemsInCart: number;
  priceTotal: number
}

// export interface User {
//   _id: string,
//   email: string,
//   exp: number,
//   iat: number,
//   name: string,
//   avatar: string,
//   numberAllOfItemsInCart: number,
//   role: string
// }

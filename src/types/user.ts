import { Document} from 'mongoose';

type AddressUser = {
  name: string,
  phone: string,
  addressDetail: string,
}

export interface IUser extends Document {
  role: number;
  address: AddressUser
  avatar: string,
  order: any;
  payment: string;
  email: string;
  password?: string;
  phone: string;
  delivery: string;
  name: string;
  status: number;
  numberAllOfItemsInCart: number;
  priceTotal: number
}

export interface IToken {
  token: string
  refreshToken: string
}

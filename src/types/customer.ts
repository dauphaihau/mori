import { Document} from 'mongoose';

export interface ICustomer extends Document {
  role: number;
  // address: IAddress
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

export interface IToken extends Document{
  token: string
  refreshAt: number
  expiredAt: number
}
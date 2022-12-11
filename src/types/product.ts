import { Document} from 'mongoose';

export interface IProduct extends Document{
  id: string,
  name: string,
  title: string,
  salePrice: number,
  description: string,
  rating: number,
  material: string,
  categories: string[]
  category: string
  images: string[],
  price: number,
  colors: string[],
  color: string,
  sold: number,
  brand: string,
  quantity: number,
  bestSelling: boolean,
  createdAt: string,
}

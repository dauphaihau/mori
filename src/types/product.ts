export interface IProduct {
  id: string,
  name: string,
  title: string,
  salePrice: number,
  description: string,
  rating: number,
  categories: string[]
  images: string[],
  price: number,
  colors: string[],
  sold: number,
  brand: string,
  quantity: number,
  bestSelling: boolean,
  createdAt: string,
}

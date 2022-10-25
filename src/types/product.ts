export interface ProductProps {
  id: string,
  name: string,
  title: string,
  salePrice: number,
  description: string,
  rating: number,
  categories: string[]
  images: string[],
  price: string | number,
  colors: string[],
  brand: string,
  quantity: number,
  bestSelling: boolean,
  createdAt: string,
}

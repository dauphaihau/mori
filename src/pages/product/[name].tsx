import { ProductInfo, ProductRelated } from 'components/pages/product';
import { ProductProvider } from "context/ProductContext";

export default function ProductPage() {
  return (
    <ProductProvider>
      <ProductInfo/>
      <ProductRelated/>
    </ProductProvider>
  )
}

import { ProductInfo, ProductRelated } from 'components/pages/product';
import { ProductProvider } from "components/context/ProductContext";

export default function ProductPage() {
  return (
    <ProductProvider>
      <ProductInfo/>
      <ProductRelated/>
    </ProductProvider>
  )
}

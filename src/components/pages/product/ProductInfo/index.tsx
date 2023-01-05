import { Box, Col, Breadcrumb, } from 'core/components';
import { PATH } from "config/const";
import ProductLongInfo from "../ProductLongInfo";
import CustomerReview from "../CustomerReview";
import ProductImages from "./ProductImages";
import ProductMainInfo from "./ProductMainInfo";
import { useProductContext } from "components/context/ProductContext";

export default function ProductInfo() {
  const { product } = useProductContext()

  const dataBreadcrumb = [
    { path: PATH.DEFAULT, name: 'Home' },
    { path: PATH.PRODUCT._, name: 'Product' },
    { name: product?.name },
  ];

  const Left = () => (
    <Box classes='w-full laptop:w-8/12 h-120 pt-2 pb-8'>
      <Breadcrumb data={dataBreadcrumb}/>
      <ProductImages/>
      <CustomerReview className='hidden laptop:block'/>
    </Box>
  )

  const Right = () => (
    <Col classes='pt-2 pb-8 px-2 laptop:px-0 w-full laptop:w-4/12'>
      <ProductMainInfo/>
      <ProductLongInfo/>
      <CustomerReview className='laptop:hidden'/>
    </Col>
  )

  return (
    <Box classes='flex flex-col laptop:flex-row gap-x-8 pt-12 laptop:mb-[350px] desktop:w-10/12 mx-auto'>
      {/*<Box classes='flex flex-col laptop:flex-row gap-x-8 pt-12 mb-48 desktop:w-10/12 mx-auto'>*/}
      <Left/>
      <Right/>
    </Box>
  )
}

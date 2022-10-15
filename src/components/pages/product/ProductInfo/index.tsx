import { Box, Col, Breadcrumb, } from 'core/components';
import Enums from "config/enums";
import ProductLongInfo from "../ProductLongInfo";
import CustomerReview2 from "../CustomerReview2";
import ProductImages from "./ProductImages";
import ProductMainInfo from "./ProductMainInfo";

const ProductInfo = ({ product }) => {

  const dataBreadcrumb = [
    { path: Enums.PATH.DEFAULT, name: 'Home' },
    { path: Enums.PATH.PRODUCT._, name: 'Products' },
    { name: product.name },
  ];

  const Left = () => {
    return (
      <Box classes='w-full laptop:w-8/12 h-120 pt-2 pb-8'>
        <Breadcrumb data={dataBreadcrumb}/>
        <ProductImages product={product}/>
        <Box classes='hidden laptop:block'>
          <CustomerReview2/>
        </Box>
      </Box>
    )
  }

  const Right = () => {
    return (
      <Col classes='pt-2 pb-8 px-2 laptop:px-0 w-full laptop:w-4/12'>
        <ProductMainInfo product={product}/>
        <ProductLongInfo description={product.description}/>

        <Box classes='laptop:hidden'>
          <CustomerReview2/>
        </Box>
      </Col>
    )
  }

  return (
    <>
      <Box classes='flex flex-col laptop:flex-row gap-x-8 pt-12 laptop:mb-[350px] desktop:w-10/12 mx-auto'>
        {/*<Box classes='flex flex-col laptop:flex-row gap-x-8 pt-12 mb-48 desktop:w-10/12 mx-auto'>*/}
        <Left/>
        <Right/>
      </Box>
    </>
  )
}

export default ProductInfo

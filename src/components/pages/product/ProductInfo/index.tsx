import { Box, Col, Breadcrumb, } from 'core/components';
import { PATH } from "config/const";
import ProductLongInfo from "../ProductLongInfo";
import CustomerReview from "../CustomerReview";
import ProductImages from "./ProductImages";
import ProductMainInfo from "./ProductMainInfo";

import { Breadcrumbs, Anchor } from '@mantine/core';
const ProductInfo = ({ product }) => {

  const dataBreadcrumb = [
    { path: PATH.DEFAULT, name: 'Home' },
    { path: PATH.PRODUCT._, name: 'Product' },
    { name: product?.name },
  ];

  // if (!product) {
  //   return null
  // }

  const items = [
    { title: 'Mantine', href: '#' },
    { title: 'Mantine hooks', href: '#' },
    { title: 'use-id', href: '#' },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

  const Left = () => {
    return (
      <Box classes='w-full laptop:w-8/12 h-120 pt-2 pb-8'>
        <Breadcrumb data={dataBreadcrumb}/>
        {/*<Breadcrumbs>{items}</Breadcrumbs>*/}
        <ProductImages product={product}/>
        <CustomerReview className='hidden laptop:block'/>
      </Box>
    )
  }

  const Right = () => {
    return (
      <Col classes='pt-2 pb-8 px-2 laptop:px-0 w-full laptop:w-4/12'>
        <ProductMainInfo product={product}/>
        <ProductLongInfo description={product.description}/>
        <CustomerReview className='laptop:hidden'/>
      </Col>
    )
  }

  return (
    <Box classes='flex flex-col laptop:flex-row gap-x-8 pt-12 laptop:mb-[350px] desktop:w-10/12 mx-auto'>
      {/*<Box classes='flex flex-col laptop:flex-row gap-x-8 pt-12 mb-48 desktop:w-10/12 mx-auto'>*/}
      <Left/>
      <Right/>
    </Box>
  )
}

export default ProductInfo

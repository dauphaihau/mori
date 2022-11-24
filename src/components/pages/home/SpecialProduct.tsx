import { formatDollarUS, slugify } from 'core/helpers';
import { Skeleton, NextImage, Col, Text, Button, Box, Row, Link } from 'core/components';
import { PATH } from 'config/const';
import FadeInSection from "../../common/FadeInSection";
import { useDetailProduct } from "services/product";
import { config } from "config";

export default function SpecialProduct () {
  const { product, isLoading } = useDetailProduct('Child’s Curved Painted')

  return (
    <FadeInSection classes='layout'>
      <Box classes='w-full mt-12 '>
        <Box classes='bg-gray-custom-50 p-6 pb-16 laptop:pb-6 flex flex-col laptop:flex-row rounded-lg min-h-[416px]'>
          {/*<Box classes='bg-gray-custom-50 p-6 pb-16 laptop:pb-6 flex laptop:flex-row flex-col rounded-lg'>*/}
          <Box classes='pt-4 pl-2 pt-12 tablet:pl-12 flex-1 flex-col'>
            <Box classes='border-l border-gray-900 px-3 pt-1 mb-10'>
              <Text classes='text-xs tracking-wider m-0 leading-tight'>COFFIN</Text>
              <Text classes='text-xs tracking-wider m-0 leading-tight'>2022</Text>
            </Box>
            <Box classes={''}>
              <Text
                span
                classes='block text-xl tablet:text-3xl laptop:text-4xl font-bold tracking-widest leading-none'
              >
                {product?.name || <Skeleton classes='w-2/3 h-[28px]'/>}
              </Text>
              <Text
                span
                classes='block py-6 tracking-wide'
              >
                {
                  isLoading ? <Skeleton
                    height={17}
                    classes='w-1/5 rounded'
                  /> : <span>FROM {formatDollarUS(product.price)}</span>
                }
              </Text>
              {
                isLoading ? <Skeleton
                    height={40}
                    classes='w-[115px] rounded'
                  /> :
                  <Link href={`${PATH.PRODUCT._}/${slugify(product?.name)}`}>
                    <Button text='Shop Now'/>
                  </Link>
              }
            </Box>

            <Col classes='flex-1 justify-end pb-10 mt-4'>
              <Text classes='font-light text-xs tracking-tight m-0 leading-tight mb-2'>Design by</Text>
              <Text classes='text-xs font-semibold tracking-tight m-0 leading-tight'>John</Text>
            </Col>
          </Box>

          <Row
            justify='center'
            align='center'
            classes='flex-1 relative'
          >
            {
              isLoading ?
                <Skeleton
                  circle
                  classes='w-48 h-48 tablet:w-56 tablet:h-60 laptop:w-60'
                /> :
                <>
                  <Box classes='z-10'>
                    <NextImage
                      priority
                      src={config.hostStaticSource + product?.images[0]}
                      alt={product?.name}
                      width={300}
                      height={300}
                      objectFit='contain'
                      // layout='intrinsic'
                    />
                  </Box>
                  <Box classes='absolute w-48 h-48 tablet:w-56 tablet:h-60 laptop:w-60  bg-white z-0 rounded-full'/>
                </>
            }
          </Row>
        </Box>
      </Box>
    </FadeInSection>
  );
}

import { useRouter } from 'next/router';
import { slugify } from 'core/helpers';
import { NextImage, Col, Text, Button, Box, Row } from 'core/components';
import Enums from 'config/enums';

const SpecialProduct = ({ data }) => {
  const router = useRouter()

  return (
    <div className='layout'>
      <Box classes='w-full mt-12 '>
        <Box classes='bg-gray-custom-50 p-6 pb-16 laptop:pb-6 flex flex-col laptop:flex-row rounded-lg'>
          {/*<Box classes='bg-gray-custom-50 p-6 pb-16 laptop:pb-6 flex laptop:flex-row flex-col rounded-lg'>*/}
          <Box classes='pt-4 pl-2 pt-12 tablet:pl-12 flex flex-col'>
            <Box classes='border-l border-gray-900 px-3 pt-1 mb-10'>
              <Text classes='text-xs tracking-wider m-0 leading-tight'>COFFIN</Text>
              <Text classes='text-xs tracking-wider m-0 leading-tight'>2022</Text>
            </Box>
            <Box>
              <Text classes='text-xl tablet:text-3xl laptop:text-4xl font-bold tracking-widest leading-none'>
                {data.name}
              </Text>
              <Text classes='py-6 tracking-wide'>FROM <span>${data.price}</span></Text>
              <Button
                classes='w-auto'
                onClick={() => router.push(`${Enums.PATH.PRODUCT._}/${slugify(data.name)}`)}
                text='Shop Now'
              />
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
            <Box classes='z-10'>
              <NextImage
                src={data.images[0]}
                alt={data.name}
                width={300}
                height={300}
                objectFit={'contain'}
                // layout='intrinsic'
              />
            </Box>
            <Box classes='absolute w-48 h-48 tablet:w-56 tablet:h-60 laptop:w-60  bg-white z-0 rounded-full'/>
          </Row>
        </Box>
      </Box>
    </div>
  );
}

export default SpecialProduct;

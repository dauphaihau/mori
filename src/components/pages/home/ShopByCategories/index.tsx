import React from 'react';

import { Box, Col, Grid, Link, NextImage, Skeleton, Text } from 'core/components';
import { cn, titleIfy } from "core/helpers";
import { config } from "config";
import FadeInSection from 'components/common/FadeInSection';
import { useUIController } from "components/context/UIControllerContext";
import { BASE_URL } from 'config/const';

const mapImage = {
  ['casket']: '/product/casket-trinity-oak_swipzi.png',
  ['child coffin']: '/product/coffin-willow-banana-leaf-curved_cep9jy.png',
  ['coffin']: '/product/coffin-willow-buff-rounded_pn6ksx.png',
  ['cremation urns']: '/product/urn-black-modern_hzizhb.png',
  ['traditional coffin']: '/product/coffin-traditional-shannon_uuwxlu.png',
  ['memorial']: '/product/memorial-mother-and-child_k4pkae.png',
  ['baby coffin']: '/product/coffin-baby-banana-leaf_ayapfe.png',
  ['shrouds']: '/product/shroud-bamboo_nptab1.png',
}

interface ICategory {
  _id: string,
  count: number
}

export default function ShopByCategories() {
  const { categories } = useUIController();

  const Categories = () => {
    if (!categories) return (
      <Skeleton
        classesWrapper='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
        quantity={8}
        height={322}
        width={309}
        classes={cn('mb-4 laptop:mb-0 bg-product p-6 relative hover:bg-gray-custom-50')}
      />
    )
    return (
      <Grid sx={1} md={2} lg={3} gap={4}>
        {
          categories && categories.length > 0 &&
          categories.map(({ _id: name, count }: ICategory, index) => (
            <Box
              classes='mb-4 laptop:mb-0 bg-product p-6 relative'
              key={index}
            >
              <Link
                href={`${BASE_URL}/product?category=${name.replace(' ', '+')}`}
                openNewTab={false}
              >
                <NextImage
                  useSkeleton
                  alt={titleIfy(name)}
                  width={200}
                  height={220}
                  src={config.hostStaticSource + mapImage[name]}
                  className='mx-auto'
                  objectFit='contain'
                  // imgClassName='w-3/5'
                />
                <Col classes='text-left mt-4'>
                  <Text
                    weight='semibold'
                    classes='text-xl mb-1'
                    text={titleIfy(name)}
                  />
                  <Text classes='text-xs text-primary-gray'>{count} items</Text>
                </Col>
              </Link>
            </Box>
          ))
        }
      </Grid>
    )
  }

  return (
    <FadeInSection classes='my-20 layout laptop:w-9/12 text-center'>
      <Text h2 classes='mb-8'>Shop By Categories</Text>
      <Categories/>
    </FadeInSection>
  );
}

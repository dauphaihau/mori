import React from 'react';
import { Box, Grid, Link, NextImage, Text } from 'core/components';
import { titleIfy } from "core/helpers";
import FadeInSection from 'components/common/FadeInSection';
import { config } from "config";

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

type Category = {
  _id: string,
  count: number
}

const ShopByCategories = ({ categories = [] }) => {
  return (
    <FadeInSection classes='my-20 layout laptop:w-9/12 text-center'>
      <Text
        h2
        classes='mb-8'
      >Shop By Categories</Text>
      <Grid sx={1} md={2} lg={3} gap={4}>
        {
          categories.length > 0 &&
          categories.map(({ _id: name, count }: Category, index) => (
            <Box
              classes='mb-4 laptop:mb-0 bg-product p-6 relative'
              key={index}
            >
              <Link
                href={`${process.env.NEXT_PUBLIC_BASE_URL}/product?category=${name.replace(' ', '+')}`}
                openNewTab={false}
              >
                <NextImage
                  alt={titleIfy(name)}
                  width={200}
                  height={220}
                  src={config.hostStaticSource + mapImage[name]}
                  className='mx-auto'
                  objectFit='contain'
                  // imgClassName='w-3/5'
                />
                <Box classes='text-left mt-4'>
                  <Text
                    weight='semibold'
                    classes='text-xl mb-1'
                    text={titleIfy(name)}
                  />
                  <Text classes='text-xs text-primary-gray'>{count} items</Text>
                </Box>
              </Link>
            </Box>
          ))
        }
        {/*{*/}
        {/*  categoriesData.map((category, index) => (*/}
        {/*    <Box classes='mb-4 laptop:mb-0 bg-product p-6 relative' key={index}>*/}
        {/*      <Link*/}
        {/*        onClick={() => handleUpdateFilters(category.name.charAt(0) + category.name.slice(1))}*/}
        {/*        href={Enums.PATH.PRODUCT._}*/}
        {/*      >*/}
        {/*        <NextImage*/}
        {/*          alt={titleIfy(category.name)}*/}
        {/*          width={200}*/}
        {/*          height={220}*/}
        {/*          src={category.image}*/}
        {/*          className='mx-auto'*/}
        {/*          objectFit='contain'*/}
        {/*          // imgClassName='w-3/5'*/}
        {/*        />*/}
        {/*        <Box classes='text-left mt-4'>*/}
        {/*          <Text*/}
        {/*            weight='semibold'*/}
        {/*            classes='text-xl mb-1'*/}
        {/*            text={titleIfy(category.name)}*/}
        {/*          />*/}
        {/*          <Text classes='text-xs text-primary-gray'>{category.itemCount} items</Text>*/}
        {/*        </Box>*/}
        {/*      </Link>*/}
        {/*    </Box>*/}
        {/*  )).slice(0, 6)*/}
        {/*}*/}
      </Grid>
    </FadeInSection>
  );
}

export default ShopByCategories;

import { Box, Divider, Text } from 'core/components';
import { FC } from 'react';

const BannerAboutPage: FC = () => {
  return (
    <Box classes='about-page__banner'>
      <Box
        classes={[
          'image-banner-frame',
          "bg-[url('https://res.cloudinary.com/duiehrbms/image/upload/v1668334342/mori-ecommerce/about/banner_rlumwu.webp')]"
        ]}
      >
        <Box classes='slogan'>
          <Text
            transforms='uppercase'
            classes='text-white text-xl'
            weight='light'
          >
            Décor & Lifestyle
          </Text>

          <Box classes='flex-center my-4'>
            <Divider classes='w-1/5'/>
          </Box>

          <Text classes='text-white pb-4 text-base laptop:text-5xl'>
            Dignity and compassion guaranteed
          </Text>
        </Box>
      </Box>
    </Box>
  );
}

export default BannerAboutPage;

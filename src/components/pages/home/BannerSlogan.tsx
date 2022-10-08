import banner from '/public/images/banners/banner-homepage.png';
import { Box, Divider, NextImage, Text } from 'core/components';
import { FC } from 'react';

const BannerSlogan: FC = () => {
  return (
    <Box
      classes='
        relative
        before:absolute before:top-0 before:left-0 before:z-10
        before:w-full before:h-[25%]
        before:bg-gradient-to-b from-[#2d2c2c]
        {/*before:bg-gradient-to-b from-black*/}
    '
    >
      <Box
        classes='
        tablet:bg-fixed
          relative mt-[-4rem]
          {/*hidden tablet:block*/}
          pt-48
          flex-center
          p-6 h-[26rem] tablet:h-56 tablet:p-10 desktop:p-8
          relative bg-no-repeat bg-center bg-cover
          before:absolute before:top-0 before:left-0 before:z-10
          before:w-full before:h-full
          before:bg-black before:opacity-40
          tablet:h-[50vh]
          laptop:h-[75vh]
      '
        style={{
          backgroundImage: `url(${banner.src})`,
        }}
      >
        <Box
          classes='absolute w-full z-10
             top-1/2 left-1/2
             -translate-y-1/2 -translate-x-1/2
             {/*font-[Quattrocento]*/}
             text-center
          '
        >
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

export default BannerSlogan;

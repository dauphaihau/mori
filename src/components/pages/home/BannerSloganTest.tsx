import { Box, Divider, Row, Text } from 'core/components';
import { useCallback } from 'react';
import { clns } from "core/helpers";
import Carousel, { useCarousel } from 'context/carouselContext';

const Dots = () => {
  const { embla: emblaApi, selectedIndex, scrollSnaps } = useCarousel();
  const scrollTo = useCallback((index) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  return <Row
    justify='center'
    classes="mt-[-2rem]"
  >
    {
      scrollSnaps.map((_, index) => (
        <button
          className={clns('carousel__dot',
            index === selectedIndex ? "active" : ''
          )}
          type="button"
          key={index}
          onClick={() => scrollTo(index)}
        />
      ))
    }
  </Row>
}

export default function BannerSlogan() {
  return (
    <Box classes='relative mx-auto mt-[-4rem]'>
      {/*<div className='embla relative max-w-[670px] mx-auto'>*/}
      <Carousel dots={<Dots/>}>
        {
          data.map((item, index) => (
            <div
              key={index}
              className='relative min-w-full'
            >
              {/*<CarouselItem index={index} key={index}>*/}
              <Box
                classes='
                    relative
                    before:absolute before:top-0 before:left-0 before:z-10
                    before:w-full before:h-1/4
                    before:bg-gradient-to-b from-[#2d2c2c]
                '
              >
                <Box
                  classes={clns(
                    item.bannerImg,
                    `
                    tablet:bg-fixed
                    relative 
                    pt-48
                    flex-center
                    p-6 h-[26rem] tablet:h-56 tablet:p-10 desktop:p-8
                    relative bg-no-repeat bg-center bg-cover
                    before:absolute before:top-0 before:left-0 before:z-10
                    before:w-full before:h-full
                    before:bg-black before:opacity-40
                    tablet:min-h-[35vh]
                    laptop:min-h-[75vh]
                    `
                  )}
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
                      classes='text-white text-[15px] tablet:text-[20px] laptop:text-xl tracking-widest'
                      weight='light'
                    >
                      {item.slogan}
                    </Text>
                    <Box classes='flex-center my-1 tablet:my-2 laptop:my-4'>
                      <Divider classes='w-1/5'/>
                    </Box>
                    <Text classes='text-white pb-4 text-base tablet:text-xl laptop:text-5xl'>
                      {item.subSlogan}
                    </Text>
                  </Box>
                </Box>
              </Box>

            </div>
          ))
        }
      </Carousel>
    </Box>
  );
}

const data = [
  {
    bannerImg: "bg-[url('/images/banners/weaver-memorials-columbarium-2.png')]",
    slogan: 'Immortalize Your Loved One',
    subSlogan: 'Dignity and compassion guaranteed'
  },
  {
    bannerImg: "bg-[url('/images/banners/banner-homepage.png')]",
    slogan: 'Décor & Lifestyle',
    subSlogan: 'Dignity and compassion guaranteed'
  },
  {
    bannerImg: "bg-[url('/images/banners/contemporary-banner.png')]",
    slogan: 'Preserving memories beyond imagination.',
    subSlogan: 'Dignity and compassion guaranteed'
  },
  {
    bannerImg: '/images/banners/banner-homepage.png',
    slogan: 'Immortalize Your Loved One',
    subSlogan: 'Dignity and compassion guaranteed'
  },
]

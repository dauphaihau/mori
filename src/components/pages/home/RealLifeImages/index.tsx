import React, { FC, useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

import { Box, NextImage, Text, Icons, Row, Link } from 'core/components';
import { cn, slugify } from 'core/helpers';
import { useFadeIn, useMediaQuery } from 'core/hooks';
import FadeInSection from "components/common/FadeInSection";
import { config } from "config";
import { PATH } from "config/const";

const RealLifeImages: FC = () => {
  const [viewportRef, embla] = useEmblaCarousel({
    align: 'start',
    skipSnaps: false
  });

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [mount, setMount] = useState(false)
  const matches = useMediaQuery('(min-width: 768px)')
  const [ref, isVisible] = useFadeIn()

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);

  useEffect(() => {
    setMount(true)
  }, [])

  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelectedIndex(embla.selectedScrollSnap())
    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    embla.on('select', onSelect);
    onSelect();
  }, [embla, onSelect]);

  const PrevBtn = () => {
    if (!mount) return null
    if (!matches) return null
    if (!prevBtnEnabled) return null
    return (
      <button
        onClick={scrollPrev}
        // disabled={!prevBtnEnabled}
        className={cn(' text-primary-black rounded-full p-4 flex-center absolute z-10 top-[35%] left-0 animate hover:-translate-x-2')}
      >
        <Icons.chevronLeft className='w-12 h-12 p-2 text-base rounded-full bg-white shadow text-black cursor-pointer'/>
      </button>
    )
  }

  const NextBtn = () => {
    if (!mount) return null
    if (!matches) return null
    if (selectedIndex === 4) return null
    return <button
      onClick={scrollNext}
      disabled={selectedIndex === 4}
      // disabled={!nextBtnEnabled}
      className=' text-primary-black rounded-full p-4 flex-center absolute z-10 top-[35%] right-0 animate hover:translate-x-2'
    >
      <Icons.chevronRight className='w-12 h-12 p-2 text-base rounded-full bg-white shadow text-black cursor-pointer'/>
    </button>
  }

  return (
    <FadeInSection classes='my-20 layout'>
      <Text h2 classes='mb-4'>Shop these real-life spaces</Text>
      <Box
        ref={viewportRef}
        classes='w-full relative overflow-hidden'
      >
        <Row classes='select-none gap-8'>
          {
            data.map((item, idx) => (
              <Link
                key={idx}
                href={`${PATH.PRODUCT._}/${slugify(item.productName)}`}
                className='w-auto'
              >
                <Box classes='relative'>
                  <NextImage
                    src={config.hostStaticSource + item.srcImg}
                    // height={284}
                    // width={284}
                    height={350}
                    width={400}
                    layout='responsive'
                    className='
                      w-[280px] h-auto
                      tablet:h-[300px] tablet:w-[400px]
                      laptop:h-[400px] laptop:w-[480px]
                      '
                    // objectFit={'contain'}
                  />
                  <Text classes='absolute bottom-1 right-2 text-white'>{item.author}</Text>
                </Box>
                <Text classes='text-sm tablet:text-xl mt-2'>{item.productName}</Text>
              </Link>
            ))
          }
        </Row>
        <PrevBtn/>
        <NextBtn/>
      </Box>
    </FadeInSection>
  );
}

export default RealLifeImages;

const data = [
  // {
  //   srcImg: '/images/Bamboo-Coffin.webp',
  //   author: '@dauphaihau',
  //   productName: 'Bamboo Coffin'
  // },
  {
    srcImg: '/real-life/coffin-willow-banana_fuvhvw.jpg',
    author: '@dauphaihau',
    productName: 'Banana Leaf Coffin'
  },
  {
    srcImg: '/real-life/willow-pod-coffin_khtmpb.jpg',
    author: '@dauphaihaudau',
    productName: 'Willow Pod Coffin'
  },
  // {
  //   srcImg: '/images/real-life/willow-pod-coffin.jpeg',
  //   author: '@dauphaihauuu',
  //   productName: 'Wicker Coffin'
  // },
  {
    srcImg: '/real-life/white-coffin_oamrxl.jpg',
    author: '@dauphaihan',
    productName: 'Curved Painted of Child'
  },
  {
    srcImg: '/real-life/willow-rounded-coffin_l5simf.jpg',
    author: '@dauphaihau0',
    productName: 'Willow Rounded Coffin'
  },
  {
    srcImg: '/real-life/buff-willow-coffin_ps2mjo.jpg',
    author: '@dauphaihauu',
    productName: 'Buff – Rounded'
  },
  {
    srcImg: '/real-life/gold-willow-coffin-2_oq8hji.jpg',
    author: '@dauphaihau1',
    productName: 'Gold Willow Coffin'
  },
  {
    srcImg: '/real-life/seagrass-coffin_xqrerq.jpg',
    author: '@dauphaihau11',
    productName: 'Seagrass Coffin'
  },
]

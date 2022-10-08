import React, { useCallback, useEffect, useState } from 'react';
import { Box, NextImage, Text } from 'core/components';
import { clns } from "core/helpers";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import useEmblaCarousel from "embla-carousel-react";

const RealLifeImages = ({ categoriesData = [] }) => {

  const [viewportRef, embla] = useEmblaCarousel({
    align: "start",
    // align: "center",
    skipSnaps: false
  });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);

  const onSelect = useCallback(() => {
    if (!embla) return;
    console.log('dauphaihau debug: embla-api-selected-scroll-snap-', embla.selectedScrollSnap())
    setSelectedIndex(embla.selectedScrollSnap())
    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    embla.on("select", onSelect);
    onSelect();
  }, [embla, onSelect]);

  const PrevBtn = () => {
    if (!prevBtnEnabled) return null
    return (
      <button
        onClick={scrollPrev}
        // disabled={!prevBtnEnabled}
        className={clns('!hidden tablet:block text-primary-black rounded-full p-4 flex-center absolute z-10 top-[35%] left-0 animate hover:-translate-x-2')}
      >
        <ChevronLeftIcon className='w-10 h-10 p-2 text-base rounded-full bg-white shadow text-black'/>
      </button>
    )
  }

  const NextBtn = () => (
    <button
      onClick={scrollNext}
      disabled={selectedIndex === 10}
      // disabled={!nextBtnEnabled}
      className='!hidden tablet:block text-primary-black rounded-full p-4 flex-center absolute z-10 top-[35%] right-0 animate hover:translate-x-2'
    >
      <ChevronRightIcon className={'w-10 h-10 p-2 text-base rounded-full bg-white shadow text-black'}/>
    </button>
  )

  return (
    <>
      <Box
        // justify='center'
        // align='center'
        // classes='my-20'
        classes='my-20 layout'
      >
        <Text
          h3
          weight='bold'
          classes='text-lg tablet:text-3xl dark:text-black mb-4'
        >Shop these real-life spaces</Text>

        <Box
          ref={viewportRef}
          classes='w-full relative overflow-hidden'
        >
          <Box classes='select-none flex gap-4'>
            {
              data.map((o, idx) => {
                return <div
                  className='w-auto'
                  key={idx}
                  // onClick={handleClick}
                >
                  <div className='relative'>
                    <NextImage
                      src={o.srcImg}
                      // height={284}
                      // width={284}
                      height={350}
                      width={400}
                      layout='responsive'
                      className='
                      w-[280px] h-auto
                      tablet:h-[300px] tablet:w-[400px]

                      '
                      // objectFit={'contain'}
                    />
                    <p className='absolute  bottom-1 right-2 text-white'>{o.author}</p>
                  </div>
                  <p className='text-sm tablet:text-xl mt-2'>{o.productName}</p>
                </div>
              })
            }
          </Box>
          <PrevBtn/>
          <NextBtn/>
        </Box>
      </Box>
    </>
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
    srcImg: '/images/real-life/coffin-willow-banana.jpeg',
    author: '@dauphaihau',
    productName: 'Banana Leaf Coffins'
  },
  {
    srcImg: '/images/real-life/willow-pod-coffin.jpeg',
    author: '@dauphaihau',
    productName: 'Willow Pod Coffin'
  },
  // {
  //   srcImg: '/images/real-life/willow-pod-coffin.jpeg',
  //   author: '@dauphaihau',
  //   productName: 'Wicker Coffin'
  // },
  {
    srcImg: '/images/real-life/white-coffin.jpg',
    author: '@dauphaihau',
    productName: 'Child’s Curved Painted'
  },
  {
    srcImg: '/images/real-life/willow-rounded-coffin.jpeg',
    author: '@dauphaihau',
    productName: 'Willow Rounded Coffin'
  },
  {
    srcImg: '/images/real-life/buff-willow-coffin.jpeg',
    author: '@dauphaihau',
    productName: 'Buff – Rounded'
  },
  {
    srcImg: '/images/real-life/gold-willow-coffin-2.jpg',
    author: '@dauphaihau',
    productName: 'Gold Willow Coffin'
  },
  {
    srcImg: '/images/real-life/seagrass-coffin.jpg',
    author: '@dauphaihau',
    productName: 'Seagrass Coffin'
  },
]

import React, { createContext, FC, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { EmblaCarouselType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import ClassNameEmbla from "embla-carousel-class-names";
import { Box } from "core/components";

interface ContextValue {
  embla: EmblaCarouselType | undefined,
  selectedIndex: number,
  scrollPrev: () => void,
  scrollNext: () => void,
  scrollSnaps: number[]
}

interface Props {
  className?: string,
  children: ReactNode
  dots: ReactNode
}

export const CarouselContext = createContext<ContextValue>({
  embla: undefined,
  selectedIndex: -1,
  scrollSnaps: [],
  scrollPrev: () => {},
  scrollNext: () => {},
})

export function useCarousel() {
  return useContext(CarouselContext);
}

const Carousel: FC<Props> = ({ children, className, dots }) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState([]);
  const [viewportRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      // align: 'start',
      align: 'center',
      skipSnaps: false
    },
    [ClassNameEmbla()]
    // [ClassNameEmbla(), Autoplay()]
  )

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    // emblaApi.canScrollNext()
    // console.log('dauphaihau debug: embla-api-can-scroll-next', emblaApi.canScrollNext())
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi, setSelectedIndex])

  useEffect(() => {
    if (!emblaApi) return
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect)
  }, [emblaApi, setScrollSnaps, onSelect])

  return (
    <CarouselContext.Provider
      value={{
        embla: emblaApi, selectedIndex, scrollPrev, scrollNext, scrollSnaps
      }}
    >
      {/*view port*/}
      <Box
        ref={viewportRef}
        classes={`carousel-viewport w-full overflow-hidden ${className}`}
      >

        {/*container */}
        <Box classes='carousel-container flex'>
          {children}
        </Box>
        <Box>
          {dots}
        </Box>
      </Box>
    </CarouselContext.Provider>
  )
}

export default Carousel

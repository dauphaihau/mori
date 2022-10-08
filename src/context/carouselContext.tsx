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
}

interface Props {
  className?: string,
  children: ReactNode
}

export const CarouselContext = createContext<ContextValue>({
  embla: undefined,
  selectedIndex: -1,
  scrollPrev: () => {},
  scrollNext: () => {},
})

export function useCarousel() {
  return useContext(CarouselContext);
}

const Carousel: FC<Props> = ({ children, className }) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [viewportRef, emblaApi] = useEmblaCarousel(
    {
      // loop: true,
      align: 'start',
      // align: 'center',
      skipSnaps: false
    },
    [ClassNameEmbla()]
    // [ClassNameEmbla(), Autoplay()]
  )
  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  // const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi.canScrollNext) {
      console.log('dauphaihau debug: embla-api-can-scroll-next', emblaApi.canScrollNext())
      emblaApi.scrollNext()
    }
  }, [emblaApi])

  // const scrollNext = useCallback(() => {
  //   if (!emblaApi) return;
  //   emblaApi.scrollNext()
  // }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    // emblaApi.canScrollNext()
    // console.log('dauphaihau debug: embla-api-can-scroll-next', emblaApi.canScrollNext())
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi, setSelectedIndex])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('select', onSelect)
    onSelect();
  }, [emblaApi, onSelect])

  // const setScrollNext = () => {
  //   if (!emblaApi) return
  //   scrollNext()
  // }

  // const onSelect = useCallback(() => {
  //   if (!embla) return;
  //   setPrevBtnEnabled(embla.canScrollPrev());
  //   setNextBtnEnabled(embla.canScrollNext());
  // }, [embla]);

  return (
    <CarouselContext.Provider value={{ embla: emblaApi, selectedIndex, scrollPrev, scrollNext }}>
      <Box
        ref={viewportRef}
        classes={`carousel-viewport w-full overflow-hidden ${className}`}
      >
        <Box classes='carousel-container flex'>
          {children}
        </Box>
      </Box>
    </CarouselContext.Provider>
  )
}

export default Carousel

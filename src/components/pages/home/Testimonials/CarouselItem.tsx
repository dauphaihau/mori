import React, { useCallback } from 'react';
import { useCarousel } from "context/carouselContext";

interface Props {
  index: number,
  children: JSX.Element
}

const CarouselItem: React.FC<Props> = ({ children, index }) => {
  const { embla: emblaApi, selectedIndex } = useCarousel();
  const isActive = selectedIndex === index

  const handleClick = useCallback(() => {
    if (emblaApi === undefined) return
    emblaApi.scrollTo(index)
  }, [emblaApi, index])

  return (
    <div
      // className={` relative ${isActive ? 'active' : ''}`}
      className={`slide relative ${isActive ? 'active' : ''}`}
      onClick={handleClick}
    >
      {children}
    </div>
  );
}

export default CarouselItem;

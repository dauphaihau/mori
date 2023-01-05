import React, { useCallback, useContext } from 'react';
import { CarouselContext } from "components/context/carouselContext";

interface Props {
  index: number,
  children: JSX.Element
}

const CarouselItem: React.FC<Props> = ({ children, index }) => {
  const { embla: emblaApi, selectedIndex } = useContext(CarouselContext);
  const isActive = selectedIndex === index

  const handleClick = useCallback(() => {
    if (emblaApi === undefined) return
    emblaApi.scrollTo(index)
  }, [emblaApi, index])

  return (
    <div
      className={`slide2 mr-4  relative ${isActive ? 'active' : ''}`}
      onClick={handleClick}
    >
      {children}
    </div>
  );
}

export default CarouselItem;

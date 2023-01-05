import React, { ReactNode, useCallback, useContext, useRef } from 'react';

import { SizeContext } from "components/context/sliderContext";
import { useAnimationFrame } from "core/hooks";
import { Box } from "core/components";
import { cn } from "core/helpers";

interface Props {
  initialOffsetX: number,
  className?: string,
  contentWidth: number
  children: ReactNode
}

const SliderContainer: React.FC<Props> = ({
  children,
  initialOffsetX,
  contentWidth,
  className
}) => {
  const { innerWidth } = useContext(SizeContext);
  const refScrollX = useRef(initialOffsetX);
  const refContainer = useRef<HTMLDivElement>(null);
  const refContent = useRef<HTMLDivElement>(null);
  const enabled = innerWidth < contentWidth

  useAnimationFrame(enabled, useCallback(() => {
    const { current: elContainer } = refContainer
    const { current: elContent } = refContent

    if (elContainer && elContainer) {
      refScrollX.current += 0.5
      elContainer.scrollLeft = refScrollX.current
      if (elContainer.scrollLeft >= elContent.clientWidth) {
        refScrollX.current = 0
        elContainer.scrollLeft = 0
      }
    }
  }, []))

  return (
    <Box
      ref={refContainer}
      classes={cn('slider-container overflow-x-hidden whitespace-nowrap max-w-full', className)}
    >
      <Box
        classes='inline-block'
        ref={refContent}
      >
        {children}
      </Box>
      <Box classes={enabled ? 'inline-block' : 'hidden'}>{children}</Box>
    </Box>
  );
}

interface ItemProps {
  width: number,
  children: ReactNode
}

export const SliderItem: React.FC<ItemProps> = ({ children, width }) => {
  return (
    <Box
      classes='inline-flex justify-center items-center mx-4'
      style={{ width }}
    >
      {children}
    </Box>
  )
}

export default SliderContainer;

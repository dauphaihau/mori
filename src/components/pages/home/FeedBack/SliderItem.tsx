import React, { ReactNode, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { SizeContext } from "context/sliderContext";
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
  className,
  contentHeight
}) => {

  const { innerWidth } = useContext(SizeContext);

  const [height, setHeight] = useState(600)
  // const [height, setHeight] = useState(0)

  const refScrollX = useRef(initialOffsetX);
  const refScrollY = useRef(initialOffsetX);
  const refContainer = useRef<HTMLDivElement>(null);
  const refContent = useRef<HTMLDivElement>(null);
  // console.log('dauphaihau debug: inner-width', innerWidth)
  console.log('dauphaihau debug: height', height)
  const enabled = innerWidth < contentWidth
  // const enabled = height < contentHeight
  console.log('dauphaihau debug: enabled', enabled)

  // useEffect(() => {
  //   if (refContainer.current) {
  //     setHeight(refContainer.current.clientHeight)
  //   }
  // })

  useAnimationFrame(enabled, useCallback(() => {
    const { current: elContainer } = refContainer
    const { current: elContent } = refContent

    if (elContainer && elContainer) {
      refScrollY.current += 0.5
      console.log('dauphaihau debug: ref-scroll-y', refScrollY)

      elContainer.scrollTop = refScrollY.current
      console.log('dauphaihau debug: el-container-scroll-top', elContainer.scrollTop)

      console.log('dauphaihau debug: el-content-client-height', elContent.clientHeight)
      if (elContainer.scrollTop >= elContent.clientHeight) {
        refScrollY.current = 0
        elContainer.scrollTop = 0
      }
    }
  }, []))

  // useAnimationFrame(enabled, useCallback(() => {
  //   const { current: elContainer } = refContainer
  //   const { current: elContent } = refContent
  //
  //   if (elContainer && elContainer) {
  //     refScrollX.current += 0.5
  //     // console.log('dauphaihau debug: ref-scroll-x', refScrollX)
  //
  //     elContainer.scrollLeft = refScrollX.current
  //     // console.log('dauphaihau debug: el-container-scroll-left', elContainer.scrollLeft)
  //
  //     if (elContainer.scrollLeft >= elContent.clientWidth) {
  //       console.log('dauphaihau debug: ref-scroll-x', refScrollX)
  //       refScrollX.current = 0
  //       elContainer.scrollLeft = 0
  //     }
  //   }
  // }, []))
  //
  return (
    <Box
      ref={refContainer}
      classes={cn('overflow-y-hidden whitespace-nowrap max-h-full max-w-full pointer-events-none',
      // classes={clns(' overflow-x-hidden whitespace-nowrap max-w-full pointer-events-none',
        className)}
    >
      <Box
        classes='block'
        // classes='inline-block'
        ref={refContent}
      >
        {children}
      </Box>

      {/*<Box classes={enabled ? 'inline-block' : 'hidden'}>{children}</Box>*/}

    </Box>
  );
}

interface ItemProps {
  width: number,
  height: number,
  children: ReactNode
}

export const SliderItem: React.FC<ItemProps> = ({ children, width, height }) => {
  return (
    <Box
      classes='flex flex-col justify-center items-center mx-4'
      // classes='inline-flex justify-center items-center mx-4'
      style={{ width , height}}
    >
      {children}
    </Box>
  )
}

export default SliderContainer;

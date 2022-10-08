import React, { useState } from 'react'
import Image, { ImageProps } from 'next/image'
import { Loading } from "../Loading";

export function BlurringImage({
  // svg: [Svg, svgProps, rectangles],
  img,
  alt,
  style,
  blurLevel = 5,
  height = undefined,
  width = undefined,
  ...props
}: ImageProps) {
  const [hasPlaceholder, setHasPlaceholder] = useState(true)

  const handleImageLoad = (e) => {
    console.log('dauphaihau debug: loaddd', e)
  };

  return (
    <div className={'relative overflow-hidden h-full w-full'}>
      {hasPlaceholder && (
        <Loading/>
        // <Svg
        //   {...svgProps}
        //   style={{
        //     ...svgProps.style,
        //     filter: `blur(${blurLevel}px)`,
        //   }}
        // >
        //   {rectangles.map(([Rect, rectProps]) => (
        //     <Rect {...rectProps} key={`${rectProps.x}${rectProps.y}`}/>
        //   ))}
        // </Svg>
      )}

      <Image
        {/*{...img}*/}
        {/*{...props}*/}
        height={height}
        width={width}
        alt={alt}
        use
        // onLoadingComplete={(e) => {
        //   handleImageLoad(e);
        // }}
        // onLoadingComplete={() => setHasPlaceholder(false)}
      />
    </div>
  )
}

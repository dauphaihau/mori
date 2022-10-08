import Image, { ImageProps } from 'next/image';
import { useState } from "react";
import { clns } from 'core/helpers';
import { Loading } from "../Loading";

type NextImageType = {
  useSkeleton?: boolean;
  imgClassName?: string;
  blurClassName?: string;
} & ImageProps;

/**
 *
 * @description Must set width using `w-` className
 * @param useSkeleton add background with pulse animation, don't use it if image is transparent
 */

const NextImageLoading = ({
  useSkeleton = false,
  src,
  width,
  height,
  alt,
  className,
  imgClassName,
  blurClassName,
  objectFit,
  layout = 'responsive',
  ...others
}: NextImageType) => {
  const [status, setStatus] = useState(useSkeleton ? 'loading' : 'complete');
  const widthIsSet = className?.includes('w-') ?? false;

  console.log('dauphaihau debug: status', status)

  const handleImageLoad = (e) => {
    console.log('dauphaihau debug: e-natural-width', e.naturalWidth)
    console.log('dauphaihau debug: e-natural-height', e.naturalHeight)
    console.log('dauphaihau debug: loaddd', e)
    setStatus('complete')
  };

  return (
    <figure
      style={!widthIsSet ? { width: `${width}px` } : undefined}
      className={clns(className,
        'overflow-hidden rounded  relative',
        status === 'loading' && 'w-auto'
        )}
    >
      {
        status === 'loading' ?
          <Loading className='h-8 w-auto'  />
          :
          <Image
            className={clns(
              imgClassName,
              // text-gray to hide alt text
              status === 'loading' && clns('animate-pulse', blurClassName)
            )}
            // src={URL.createObjectURL(src)}
            src={src}
            width={width}
            height={height}
            alt={alt}
            // onLoadingComplete={() => setStatus('complete')}
            onLoadingComplete={(e) => {
              console.log('dauphaihau debug: e-natural-width', e.naturalWidth)
              console.log('dauphaihau debug: e-natural-height', e.naturalHeight)
              handleImageLoad(e);
            }}

            layout={layout}
            objectFit={objectFit}
            {...others}
          />
      }
    </figure>
  );
}

export default NextImageLoading

import Image, { ImageProps } from 'next/image';
import { useState } from "react";
import { clns } from 'core/helpers';

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

const NextImage = ({
  useSkeleton = false,
  src,
  width,
  height,
  alt,
  className,
  imgClassName,
  blurClassName,
  layout = 'responsive',
  ...others
}: NextImageType) => {
  const [status, setStatus] = useState(useSkeleton ? 'loading' : 'complete');
  const widthIsSet = className?.includes('w-') ?? false;

  return (
    <figure
      style={!widthIsSet ? { width: `${width}px` } : undefined}
      className={clns(className,
        'overflow-hidden rounded relative'
      )}
    >
      <Image
        className={clns(
          imgClassName,
          // text-gray to hide alt text
          status === 'loading' && clns('animate-pulse', blurClassName)
        )}
        src={src}
        width={width}
        height={height}
        alt={alt}
        onLoadingComplete={() => setStatus('complete')}
        layout={layout}
        {...others}
      />
    </figure>
  );
}

export default NextImage

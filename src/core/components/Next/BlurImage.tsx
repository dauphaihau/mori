import Image, { ImageProps } from 'next/image';
import { useState } from "react";
import { cn } from 'core/helpers';

type NextImageType = {
  useSkeleton?: boolean;
  imgClassName?: string;
  blurClassName?: string;
} & ImageProps;

/**
 *
 * @description Must set width using `w-` className
 */

const BlurImage = ({
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
  const [isLoading, setLoading] = useState(true);
  const widthIsSet = className?.includes('w-') ?? false;

  return (
    <figure
      style={!widthIsSet ? { width: `${width}px` } : undefined}
      className={cn('overflow-hidden rounded relative',
        className
      )}
    >
      <Image
        className={cn(
          'duration-700 ease-in-out',
          isLoading
            ? 'grayscale blur-2xl scale-110'
            : 'grayscale-0 blur-0 scale-100'
        )}
        src={src}
        width={width}
        height={height}
        alt={alt}
        onLoadingComplete={() => setLoading(false)}
        layout={layout}
        {...others}
      />
    </figure>
  );
}

export default BlurImage

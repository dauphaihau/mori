import Image, { ImageProps } from 'next/image';
import { useState } from "react";
import { cn } from 'core/helpers';
import { Loading } from "../Loading";
import { LoadingOverlay } from '@mantine/core';

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

  return (
    <figure
      style={!widthIsSet ? { width: `${width}px` } : undefined}
      className={cn(className,
        'overflow-hidden rounded relative',
      )}
    >
      {
        status === 'loading' && <LoadingOverlay
          // loaderProps={{ size: 'sm', color: 'black', variant: 'bars' }}
          loaderProps={{ size: 'md', color: 'black', variant: 'dots' }}
          overlayOpacity={0.3}
          overlayColor="transparent"
          visible
        />
      }
      <Image
        className={cn(
          imgClassName,
        )}
        src={src}
        width={width}
        height={height}
        alt={alt}
        onLoad={(e: any) => {
          e.target.src.indexOf('data:image/gif;base64') < 0 && setStatus('complete')
        }}
        // onLoadingComplete={() => setStatus('complete')}
        layout={layout}
        objectFit={objectFit}
        {...others}
      />
    </figure>
  );
}

export default NextImageLoading

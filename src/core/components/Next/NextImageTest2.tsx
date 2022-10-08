import { ImageProps } from "next/image";
import { useState } from "react";

export const Image = ({ css, skeleton = false, ...props }: {css?: any} & Omit<ImageProps, 'onLoadingComplete'>) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSkeleton, setIsSkeleton] = useState(skeleton);

  return (
    <div
      style={{
        position: 'relative',
        inlineSize: '100%',

        overflow: 'hidden',

        '@keyframes shimmer': {
          from: {
            transform: 'translateX(-100%)',
          },
          to: {
            transform: 'translateX(100%)',
          },
        },

        '&.skeleton': {
          background: 'var(--gray-4)',

          '&::before': {
            content: '',
            position: 'absolute',
            inset: 0,
            backgroundImage: `linear-gradient(
				90deg,
			        rgba(255, 255, 255, 0) 0,
	                        rgba(255, 255, 255, 0.2) 20%,
                                rgba(255, 255, 255, 0.5) 60%,
	                        rgba(255, 255, 255, 0)
			)`,
            animation: 'shimmer 2s infinite',
          },
        },
      }}
      className={clsx({ skeleton: isSkeleton })}
    >
      <div
        style={{
          '&.fade': {
            transition: 'opacity 200ms ease',
            opacity: 0,

            '&[data-loaded="true"]': {
              opacity: 1,
            },
          },

          ...css,
        }}
        className={clsx({ fade: transition })}
        data-loaded={isLoaded}
        /* remove skeleton after transition ends */
        onTransitionEnd={event => event.propertyName === 'opacity' && setIsSkeleton(false)}
      >
        <NextImage
          quality={90}
          layout="intrinsic"
          {...props}
          onLoadingComplete={() => setIsLoaded(true)}
        />
      </div>
    </div>
  );
};

import React, { useEffect } from 'react';
import { Text, Link, Box, Row, Col, NextImage, Badge, Skeleton } from 'core/components';
import { cn, formatDollarUS, sliceText, slugify } from 'core/helpers';
import { PATH } from "config/const";
import { config } from "config";

const hoverEffect = typeof window !== `undefined` ? require('hover-effect').default : null;

const BigProductFlashSaleCard = ({ data }) => {
  if (!data) return <Skeleton height={738} width={570} classes='bg-product'/>
  // if (!data) return null
  // console.log('dauphaihau debug: data', data)
  const { name, price, salePrice, description, link, images } = data;

  // useEffect(() => {
  //   Array.from(document.querySelectorAll('.product-card__images')).forEach(
  //     (el: any) => {
  //       const imgs: any = Array.from(el.querySelectorAll('img'));
  //       if (imgs[0] && imgs[1]) {
  //         new hoverEffect({
  //           parent: el,
  //           intensity: 0.2,
  //           speedIn: el.dataset.speedin || undefined,
  //           speedOut: el.dataset.speedout || undefined,
  //           easing: el.dataset.easing || undefined,
  //           hover: el.dataset.hover || undefined,
  //           image1: imgs[0].getAttribute('src') || undefined,
  //           image2: imgs[1].getAttribute('src') || undefined,
  //           displacementImage: el.dataset.displacement,
  //         });
  //       }
  //     }
  //   );
  // }, []);

  // const Badge = () => {
  //   if (!salePrice) return <Box classes='h-5'/>
  //   return <Box>
  //     <Text
  //       weight='bold'
  //       span
  //       classes='product-card__badge'
  //     >
  //       {(((price - salePrice) / price) * 100).toFixed()}%
  //     </Text>
  //   </Box>
  // }

  const Content = () => (
    <Box classes='product-card__content'>
      <Col>
        <Text classes='title'>{name.slice(0, 23)}</Text>
        <Text classes='describe'>{sliceText(description, 40)}</Text>
      </Col>

      <Box classes='text-right desktop:hidden'>
        <Row classes='desktop:flex-col'>
          <Text classes='text-xl tracking-wide text-primary-red'>
            {formatDollarUS(salePrice)}
          </Text>
          <Text classes='ml-2.5 line-through text-primary-gray text-sm tablet:text-base'>
            {formatDollarUS(price)}
          </Text>
        </Row>
      </Box>

      <Box classes={cn('text-right hidden desktop:flex', !salePrice && 'items-center')}>
        <Col>
          <Text classes='ml-3 line-through font-light text-gray-700 text-sm tablet:text-base'>
            {formatDollarUS(data?.price)}
          </Text>
          <Text classes='text-xl tracking-wide text-primary-red'>
            {formatDollarUS(data?.salePrice)}
          </Text>
        </Col>
      </Box>
    </Box>
  )

  const Images = () => {
    return (
      <>
        <Col
          align='center'
          justify='center'
        >
          <Box
            data-displacement='/images/hover-effect/distortion.jpeg'
            classes={cn('product-card__images',
              'w-[25rem] h-[22rem] desktop:w-[25rem] desktop:h-[23rem]',
              'hidden'
            )}
          >
            <img
              className='img-effect'
              // src={images[0]}
              src={config.hostStaticSource + images[0]}
              alt={name}
            />
            <img
              className='img-effect'
              src={config.hostStaticSource + images[1]}
              // src={images[1]}
              alt={name}
            />
          </Box>
        </Col>

        <NextImage
          src={config.hostStaticSource + images[0]}
          alt={name}
          className='w-auto'
          // className='laptop:hidden w-auto'
          width={200}
          useSkeleton
          height={200}
          objectFit='contain'
        />
      </>
    )
  }

  return (
    <Box classes='product-card'>
      <Link href={`${PATH.PRODUCT._}/${slugify(data?.name)}`}>
        <Col
          classes='h-full relative'
          justify='between'
        >
          <Badge
            hideIf={!salePrice}
            classes='absolute z-10'
          >
            {(((price - salePrice) / price) * 100).toFixed()}%
          </Badge>
          <Images/>
          <Content/>
        </Col>
      </Link>
    </Box>
  )
}

export default BigProductFlashSaleCard;
